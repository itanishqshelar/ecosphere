import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { z } from "zod";

const factorSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  unit: z.string(),
  co2_per_unit: z.number(),
});

const factorsSchema = z.array(factorSchema);

const extractedSchema = z.object({
  activity: z.string().optional(),
  quantity: z.number().positive().optional(),
  unit: z.string().optional(),
  date: z.string().optional(),
  merchant: z.string().optional(),
  category_hint: z.string().optional(),
  note: z.string().optional(),
});

type EmissionFactorCandidate = z.infer<typeof factorSchema>;

function scoreFactorMatch(factor: EmissionFactorCandidate, extracted: z.infer<typeof extractedSchema>) {
  const haystack = `${factor.name} ${factor.category} ${factor.unit}`.toLowerCase();
  const targets = [
    extracted.activity,
    extracted.unit,
    extracted.category_hint,
    extracted.merchant,
    extracted.note,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  let score = 0;

  if (!targets) {
    return score;
  }

  for (const token of targets.split(/[^a-z0-9]+/).filter((part) => part.length > 2)) {
    if (haystack.includes(token)) {
      score += 2;
    }
  }

  if (extracted.unit && factor.unit.toLowerCase() === extracted.unit.toLowerCase()) {
    score += 3;
  }

  if (extracted.activity && haystack.includes(extracted.activity.toLowerCase())) {
    score += 5;
  }

  return score;
}

function chooseFactor(factors: EmissionFactorCandidate[], extracted: z.infer<typeof extractedSchema>) {
  return [...factors]
    .sort((a, b) => scoreFactorMatch(b, extracted) - scoreFactorMatch(a, extracted))[0];
}

function normalizeDate(value?: string) {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toISOString().split("T")[0];
}

function inferFallback(fileName: string, factors: EmissionFactorCandidate[]) {
  const normalizedName = fileName.toLowerCase();
  const electricityFactor = factors.find((factor) => /electric|power|grid/.test(`${factor.name} ${factor.category}`.toLowerCase()));
  const fuelFactor = factors.find((factor) => /diesel|fuel|petrol|gas/.test(`${factor.name} ${factor.category}`.toLowerCase()));

  if (/electric|power|utility/.test(normalizedName) && electricityFactor) {
    return {
      activity: electricityFactor.name,
      emission_factor_id: electricityFactor.id,
      note: "Receipt image uploaded. Add the consumption quantity from the bill to calculate CO2.",
    };
  }

  if (/diesel|fuel|petrol|gas/.test(normalizedName) && fuelFactor) {
    return {
      activity: fuelFactor.name,
      emission_factor_id: fuelFactor.id,
      note: "Receipt image uploaded. Review the detected fuel activity and quantity before saving.",
    };
  }

  return {
    note: "Receipt uploaded. Configure GROQ_API_KEY to enable automatic value extraction from receipt images.",
  };
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const receipt = formData.get("receipt");
    const factorsRaw = formData.get("emissionFactors");

    if (!(receipt instanceof File)) {
      return NextResponse.json({ error: "Receipt image is required" }, { status: 400 });
    }

    const factorParse = factorsSchema.safeParse(JSON.parse(String(factorsRaw ?? "[]")));
    if (!factorParse.success) {
      return NextResponse.json({ error: "Emission factors are invalid" }, { status: 400 });
    }

    const factors = factorParse.data;
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!groqApiKey) {
      return NextResponse.json(inferFallback(receipt.name, factors));
    }

    const arrayBuffer = await receipt.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const imageUrl = `data:${receipt.type || "image/jpeg"};base64,${base64}`;

    const groq = new Groq({ apiKey: groqApiKey });
    const completion = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "Extract structured carbon accounting data from receipt images. Return JSON only with keys: activity, quantity, unit, date, merchant, category_hint, note. Use ISO date when possible and omit any uncertain fields.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this receipt image for a carbon transaction. Available emission factors:\n${factors.map((factor) => `- ${factor.name} | category: ${factor.category} | unit: ${factor.unit}`).join("\n")}`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    const parsed = extractedSchema.safeParse(raw ? JSON.parse(raw) : {});

    if (!parsed.success) {
      return NextResponse.json(inferFallback(receipt.name, factors));
    }

    const extracted = parsed.data;
    const factor = chooseFactor(factors, extracted);

    return NextResponse.json({
      activity: extracted.activity ?? factor?.name,
      emission_factor_id: factor?.id,
      quantity: extracted.quantity,
      date: normalizeDate(extracted.date),
      note: extracted.note ?? `Matched receipt to ${factor?.name ?? "the closest emission factor"}. Please review before saving.`,
    });
  } catch (error) {
    console.error("Receipt analysis failed", error);
    return NextResponse.json(
      { error: "Receipt analysis failed. Please try again or fill the values manually." },
      { status: 500 },
    );
  }
}
