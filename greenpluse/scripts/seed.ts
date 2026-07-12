import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ── Helpers ──────────────────────────────────────────────────
function rnd(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function daysFromNow(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}
function daysAgo(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

async function seed() {
  console.log("🌱 Starting GreenPulse seed...\n");

  // ── 1. DEPARTMENTS ─────────────────────────────────────────
  console.log("📂 Seeding departments...");
  const { data: depts, error: deptErr } = await supabase
    .from("departments")
    .insert([
      { name: "Engineering" },
      { name: "HR" },
      { name: "Finance" },
      { name: "Operations" },
      { name: "Marketing" },
      { name: "Sales" },
      { name: "Legal" },
      { name: "Product" },
    ])
    .select();
  if (deptErr) { console.error("Dept error:", deptErr.message); process.exit(1); }
  const deptMap: Record<string, string> = {};
  depts!.forEach((d) => (deptMap[d.name] = d.id));
  console.log(`   ✓ ${depts!.length} departments`);

  // ── 2. EMPLOYEES ───────────────────────────────────────────
  console.log("👥 Seeding employees...");
  const { data: emps, error: empErr } = await supabase
    .from("employees")
    .insert([
      { name: "Priya Sharma",    email: "priya.sharma@greenco.in",    department_id: deptMap["HR"],          role: "employee",    xp: 4820, avatar: "PS" },
      { name: "Arjun Mehta",     email: "arjun.mehta@greenco.in",     department_id: deptMap["Engineering"], role: "employee",    xp: 4560, avatar: "AM" },
      { name: "Sneha Patel",     email: "sneha.patel@greenco.in",     department_id: deptMap["Marketing"],   role: "employee",    xp: 4210, avatar: "SP" },
      { name: "Rahul Verma",     email: "rahul.verma@greenco.in",     department_id: deptMap["Finance"],     role: "employee",    xp: 3980, avatar: "RV" },
      { name: "Kavya Nair",      email: "kavya.nair@greenco.in",      department_id: deptMap["Operations"],  role: "employee",    xp: 3750, avatar: "KN" },
      { name: "Aditya Kumar",    email: "aditya.kumar@greenco.in",    department_id: deptMap["Sales"],       role: "employee",    xp: 3540, avatar: "AK" },
      { name: "Meera Joshi",     email: "meera.joshi@greenco.in",     department_id: deptMap["Legal"],       role: "esg_manager", xp: 2900, avatar: "MJ" },
      { name: "Rohit Singh",     email: "rohit.singh@greenco.in",     department_id: deptMap["Product"],     role: "employee",    xp: 2600, avatar: "RS" },
      { name: "Ananya Desai",    email: "ananya.desai@greenco.in",    department_id: deptMap["Engineering"], role: "employee",    xp: 2200, avatar: "AD" },
      { name: "Admin GreenPulse",email: "admin@greenco.in",           department_id: deptMap["Engineering"], role: "admin",       xp: 5000, avatar: "AG" },
    ])
    .select();
  if (empErr) { console.error("Emp error:", empErr.message); process.exit(1); }
  const empMap: Record<string, string> = {};
  emps!.forEach((e) => (empMap[e.name] = e.id));
  console.log(`   ✓ ${emps!.length} employees`);

  // ── 3. EMISSION FACTORS ────────────────────────────────────
  console.log("⚗️  Seeding emission factors...");
  const { data: efactors, error: efErr } = await supabase
    .from("emission_factors")
    .insert([
      { name: "Diesel Fuel",         category: "Fuel",        co2_per_unit: 2.68,  unit: "litre",  status: "active" },
      { name: "Petrol Fuel",         category: "Fuel",        co2_per_unit: 2.31,  unit: "litre",  status: "active" },
      { name: "Grid Electricity",    category: "Electricity", co2_per_unit: 0.82,  unit: "kWh",    status: "active" },
      { name: "Air Travel (Short)",  category: "Travel",      co2_per_unit: 0.255, unit: "km",     status: "active" },
      { name: "Air Travel (Long)",   category: "Travel",      co2_per_unit: 0.195, unit: "km",     status: "active" },
      { name: "Manufacturing",       category: "Industry",    co2_per_unit: 1.42,  unit: "unit",   status: "active" },
      { name: "Natural Gas",         category: "Fuel",        co2_per_unit: 2.04,  unit: "kg",     status: "active" },
      { name: "Rail Travel",         category: "Travel",      co2_per_unit: 0.041, unit: "km",     status: "active" },
    ])
    .select();
  if (efErr) { console.error("EF error:", efErr.message); process.exit(1); }
  const efMap: Record<string, string> = {};
  efactors!.forEach((ef) => (efMap[ef.name] = ef.id));
  console.log(`   ✓ ${efactors!.length} emission factors`);

  // ── 4. CARBON TRANSACTIONS ────────────────────────────────
  console.log("🌍 Seeding carbon transactions...");
  const txns = [
    { department_id: deptMap["Operations"],  activity: "Diesel Fuel",       emission_factor_id: efMap["Diesel Fuel"],        quantity: 500,   unit: "litre", co2_kg: 1340.00, status: "approved", date: daysAgo(2) },
    { department_id: deptMap["Engineering"], activity: "Grid Electricity",  emission_factor_id: efMap["Grid Electricity"],   quantity: 12000, unit: "kWh",   co2_kg: 9840.00, status: "approved", date: daysAgo(3) },
    { department_id: deptMap["Sales"],       activity: "Air Travel",        emission_factor_id: efMap["Air Travel (Short)"], quantity: 2400,  unit: "km",    co2_kg: 612.00,  status: "approved", date: daysAgo(4) },
    { department_id: deptMap["HR"],          activity: "Grid Electricity",  emission_factor_id: efMap["Grid Electricity"],   quantity: 3200,  unit: "kWh",   co2_kg: 2624.00, status: "approved", date: daysAgo(5) },
    { department_id: deptMap["Finance"],     activity: "Air Travel (Long)", emission_factor_id: efMap["Air Travel (Long)"],  quantity: 8000,  unit: "km",    co2_kg: 1560.00, status: "pending",  date: daysAgo(6) },
    { department_id: deptMap["Operations"],  activity: "Manufacturing",     emission_factor_id: efMap["Manufacturing"],      quantity: 300,   unit: "unit",  co2_kg: 426.00,  status: "approved", date: daysAgo(7) },
    { department_id: deptMap["Marketing"],   activity: "Petrol Fuel",       emission_factor_id: efMap["Petrol Fuel"],        quantity: 200,   unit: "litre", co2_kg: 462.00,  status: "approved", date: daysAgo(10) },
    { department_id: deptMap["Product"],     activity: "Grid Electricity",  emission_factor_id: efMap["Grid Electricity"],   quantity: 5000,  unit: "kWh",   co2_kg: 4100.00, status: "approved", date: daysAgo(12) },
    { department_id: deptMap["Legal"],       activity: "Air Travel",        emission_factor_id: efMap["Air Travel (Short)"], quantity: 1200,  unit: "km",    co2_kg: 306.00,  status: "rejected", date: daysAgo(15) },
    { department_id: deptMap["Engineering"], activity: "Natural Gas",       emission_factor_id: efMap["Natural Gas"],        quantity: 400,   unit: "kg",    co2_kg: 816.00,  status: "approved", date: daysAgo(18) },
    { department_id: deptMap["Operations"],  activity: "Diesel Fuel",       emission_factor_id: efMap["Diesel Fuel"],        quantity: 350,   unit: "litre", co2_kg: 938.00,  status: "approved", date: daysAgo(22) },
    { department_id: deptMap["Sales"],       activity: "Grid Electricity",  emission_factor_id: efMap["Grid Electricity"],   quantity: 2800,  unit: "kWh",   co2_kg: 2296.00, status: "approved", date: daysAgo(25) },
    { department_id: deptMap["Finance"],     activity: "Rail Travel",       emission_factor_id: efMap["Rail Travel"],        quantity: 3000,  unit: "km",    co2_kg: 123.00,  status: "approved", date: daysAgo(28) },
    { department_id: deptMap["HR"],          activity: "Petrol Fuel",       emission_factor_id: efMap["Petrol Fuel"],        quantity: 150,   unit: "litre", co2_kg: 346.50,  status: "pending",  date: daysAgo(1) },
  ];
  const { data: txnData, error: txnErr } = await supabase.from("carbon_transactions").insert(txns).select();
  if (txnErr) { console.error("Txn error:", txnErr.message); process.exit(1); }
  console.log(`   ✓ ${txnData!.length} carbon transactions`);

  // ── 5. ESG GOALS ──────────────────────────────────────────
  console.log("🎯 Seeding ESG goals...");
  const { data: goals, error: goalErr } = await supabase
    .from("esg_goals")
    .insert([
      { title: "Reduce Operations Carbon by 20%", department_id: deptMap["Operations"],  target_carbon: 800,  current_carbon: 980,  deadline: daysFromNow(172), status: "active" },
      { title: "Cut Electricity Consumption 15%", department_id: deptMap["Engineering"], target_carbon: 4500, current_carbon: 5200, deadline: daysFromNow(80),  status: "active" },
      { title: "Zero Single-Use Plastic",          department_id: deptMap["HR"],          target_carbon: 0,    current_carbon: 12,   deadline: daysFromNow(50),  status: "active" },
      { title: "Net Zero Travel Emissions",        department_id: deptMap["Sales"],       target_carbon: 500,  current_carbon: 850,  deadline: daysFromNow(200), status: "active" },
    ])
    .select();
  if (goalErr) { console.error("Goal error:", goalErr.message); process.exit(1); }
  console.log(`   ✓ ${goals!.length} ESG goals`);

  // ── 6. CSR ACTIVITIES ─────────────────────────────────────
  console.log("🤝 Seeding CSR activities...");
  const { data: csrActs, error: csrErr } = await supabase
    .from("csr_activities")
    .insert([
      { title: "Beach Cleanup Drive",    category: "Environment", description: "Clean Juhu Beach from plastic and marine debris", location: "Juhu Beach, Mumbai",         date: daysFromNow(3),  points: 200, max_participants: 50, status: "upcoming"  },
      { title: "Blood Donation Camp",    category: "Health",      description: "Donate blood and save lives",                     location: "HQ Office",                  date: daysAgo(4),      points: 300, max_participants: 80, status: "completed" },
      { title: "Tree Plantation Drive",  category: "Environment", description: "Plant 500 trees in Aarey Colony",                 location: "Aarey Colony, Mumbai",       date: daysFromNow(10), points: 250, max_participants: 100,status: "upcoming"  },
      { title: "Education Camp",         category: "Education",   description: "Teach digital literacy to underprivileged kids",  location: "Dharavi Community Center",   date: daysAgo(0),      points: 180, max_participants: 30, status: "active"    },
      { title: "Animal Shelter Visit",   category: "Welfare",     description: "Spend a day helping at the local animal shelter", location: "Mumbai SPCA",                date: daysFromNow(20), points: 150, max_participants: 20, status: "upcoming"  },
      { title: "Community Health Camp",  category: "Health",      description: "Free health checkups for local community",        location: "Andheri Community Hall",     date: daysFromNow(14), points: 200, max_participants: 60, status: "upcoming"  },
    ])
    .select();
  if (csrErr) { console.error("CSR error:", csrErr.message); process.exit(1); }
  const csrMap: Record<string, string> = {};
  csrActs!.forEach((c) => (csrMap[c.title] = c.id));
  console.log(`   ✓ ${csrActs!.length} CSR activities`);

  // ── CSR Participations ─────────────────────────────────────
  await supabase.from("csr_participations").insert([
    { csr_activity_id: csrMap["Beach Cleanup Drive"],   employee_id: empMap["Priya Sharma"],  approval_status: "pending",  points_earned: 0 },
    { csr_activity_id: csrMap["Beach Cleanup Drive"],   employee_id: empMap["Arjun Mehta"],   approval_status: "pending",  points_earned: 0 },
    { csr_activity_id: csrMap["Blood Donation Camp"],   employee_id: empMap["Priya Sharma"],  approval_status: "approved", points_earned: 300, completion_date: daysAgo(4) },
    { csr_activity_id: csrMap["Blood Donation Camp"],   employee_id: empMap["Sneha Patel"],   approval_status: "approved", points_earned: 300, completion_date: daysAgo(4) },
    { csr_activity_id: csrMap["Blood Donation Camp"],   employee_id: empMap["Kavya Nair"],    approval_status: "approved", points_earned: 300, completion_date: daysAgo(4) },
    { csr_activity_id: csrMap["Education Camp"],        employee_id: empMap["Rahul Verma"],   approval_status: "pending",  points_earned: 0 },
    { csr_activity_id: csrMap["Tree Plantation Drive"], employee_id: empMap["Aditya Kumar"],  approval_status: "pending",  points_earned: 0 },
    { csr_activity_id: csrMap["Tree Plantation Drive"], employee_id: empMap["Rohit Singh"],   approval_status: "pending",  points_earned: 0 },
  ]);
  console.log("   ✓ CSR participations");

  // ── 7. POLICIES ───────────────────────────────────────────
  console.log("📋 Seeding policies...");
  const { data: pols, error: polErr } = await supabase
    .from("policies")
    .insert([
      { title: "Environmental Sustainability Policy", description: "Our commitment to reducing environmental impact across all operations and supply chain activities.", version: "v2.1", effective_date: "2026-01-01", department_id: null,               status: "active" },
      { title: "Data Privacy & Security Policy",      description: "Guidelines for handling, storing and protecting company and customer data.",                         version: "v3.0", effective_date: "2026-03-15", department_id: deptMap["Engineering"],status: "active" },
      { title: "Code of Conduct",                     description: "Expected standards of professional behavior for all employees.",                                    version: "v1.4", effective_date: "2025-10-01", department_id: null,               status: "active" },
      { title: "ESG Reporting Guidelines",            description: "Mandatory guidelines for department-level ESG data reporting and submission.",                      version: "v1.0", effective_date: "2026-06-01", department_id: deptMap["Finance"], status: "draft"  },
      { title: "Anti-Bribery & Corruption Policy",    description: "Zero-tolerance policy on bribery and corruption in all business dealings.",                        version: "v2.0", effective_date: "2026-04-01", department_id: null,               status: "active" },
    ])
    .select();
  if (polErr) { console.error("Policy error:", polErr.message); process.exit(1); }
  const polMap: Record<string, string> = {};
  pols!.forEach((p) => (polMap[p.title] = p.id));
  console.log(`   ✓ ${pols!.length} policies`);

  // ── Policy Acknowledgements ───────────────────────────────
  const polAcks = [];
  for (const emp of emps!) {
    for (const pol of pols!) {
      polAcks.push({
        policy_id:   pol.id,
        employee_id: emp.id,
        status:      Math.random() > 0.15 ? "accepted" : (Math.random() > 0.5 ? "pending" : "rejected"),
        acknowledged_at: Math.random() > 0.15 ? new Date().toISOString() : null,
      });
    }
  }
  await supabase.from("policy_acknowledgements").insert(polAcks);
  console.log("   ✓ Policy acknowledgements");

  // ── 8. CHALLENGES ─────────────────────────────────────────
  console.log("🏆 Seeding challenges...");
  const { data: challs, error: challErr } = await supabase
    .from("challenges")
    .insert([
      { title: "Zero Plastic Week",       category: "Environmental", description: "Go plastic-free for an entire week. Document your journey.", difficulty: "Medium", xp: 300, deadline: daysFromNow(8),  evidence_required: true,  status: "active" },
      { title: "Cycle to Office",         category: "Environmental", description: "Commute to office by bicycle for 5 working days.",           difficulty: "Easy",   xp: 150, deadline: daysFromNow(19), evidence_required: true,  status: "active" },
      { title: "Volunteer 3 Hours",       category: "Social",        description: "Volunteer for any approved CSR activity for 3+ hours.",       difficulty: "Easy",   xp: 200, deadline: daysFromNow(13), evidence_required: true,  status: "active" },
      { title: "Plant 5 Trees",           category: "Environmental", description: "Plant 5 trees in your local community and share photos.",    difficulty: "Medium", xp: 400, deadline: daysFromNow(29), evidence_required: true,  status: "active" },
      { title: "Save 20% Electricity",    category: "Environmental", description: "Reduce your department's monthly electricity usage by 20%.",  difficulty: "Hard",   xp: 600, deadline: daysFromNow(20), evidence_required: false, status: "active" },
      { title: "Green Diet Challenge",    category: "Social",        description: "Switch to a plant-based diet for 2 weeks.",                  difficulty: "Medium", xp: 250, deadline: daysFromNow(16), evidence_required: true,  status: "active" },
      { title: "Digital Declutter",       category: "Environmental", description: "Delete 1000 old emails to reduce data center carbon.",        difficulty: "Easy",   xp: 100, deadline: daysFromNow(5),  evidence_required: false, status: "active" },
      { title: "Water Conservation Week", category: "Environmental", description: "Reduce water usage by 30% for one week.",                    difficulty: "Medium", xp: 280, deadline: daysFromNow(22), evidence_required: false, status: "active" },
    ])
    .select();
  if (challErr) { console.error("Chall error:", challErr.message); process.exit(1); }
  const challMap: Record<string, string> = {};
  challs!.forEach((c) => (challMap[c.title] = c.id));
  console.log(`   ✓ ${challs!.length} challenges`);

  // ── Challenge Participations ───────────────────────────────
  const challParts = [
    { challenge_id: challMap["Zero Plastic Week"],    employee_id: empMap["Priya Sharma"],  status: "completed" },
    { challenge_id: challMap["Zero Plastic Week"],    employee_id: empMap["Arjun Mehta"],   status: "joined"    },
    { challenge_id: challMap["Zero Plastic Week"],    employee_id: empMap["Sneha Patel"],   status: "joined"    },
    { challenge_id: challMap["Cycle to Office"],      employee_id: empMap["Arjun Mehta"],   status: "completed" },
    { challenge_id: challMap["Cycle to Office"],      employee_id: empMap["Rahul Verma"],   status: "completed" },
    { challenge_id: challMap["Cycle to Office"],      employee_id: empMap["Kavya Nair"],    status: "joined"    },
    { challenge_id: challMap["Volunteer 3 Hours"],    employee_id: empMap["Sneha Patel"],   status: "completed" },
    { challenge_id: challMap["Volunteer 3 Hours"],    employee_id: empMap["Aditya Kumar"],  status: "joined"    },
    { challenge_id: challMap["Plant 5 Trees"],        employee_id: empMap["Priya Sharma"],  status: "joined"    },
    { challenge_id: challMap["Save 20% Electricity"], employee_id: empMap["Arjun Mehta"],   status: "joined"    },
    { challenge_id: challMap["Green Diet Challenge"], employee_id: empMap["Meera Joshi"],   status: "completed" },
    { challenge_id: challMap["Green Diet Challenge"], employee_id: empMap["Rohit Singh"],   status: "joined"    },
    { challenge_id: challMap["Digital Declutter"],    employee_id: empMap["Ananya Desai"],  status: "completed" },
  ];
  await supabase.from("challenge_participations").insert(challParts);
  console.log("   ✓ Challenge participations");

  // ── 9. BADGES ─────────────────────────────────────────────
  console.log("🎖️  Seeding badges...");
  const { data: bads, error: badErr } = await supabase
    .from("badges")
    .insert([
      { name: "Green Warrior",     icon: "🌿", description: "Complete 5 environmental challenges",      xp_required: 500  },
      { name: "Eco Hero",          icon: "⚡", description: "Reduce personal carbon footprint by 20%",  xp_required: 1000 },
      { name: "Climate Champion",  icon: "🌍", description: "Complete all ESG training modules",        xp_required: 2000 },
      { name: "Volunteer King",    icon: "👑", description: "Participate in 10 CSR activities",         xp_required: 1500 },
      { name: "Compliance Master", icon: "📋", description: "Accept all company policies on time",      xp_required: 300  },
      { name: "CSR Legend",        icon: "🌟", description: "Earn 5000+ XP from social activities",    xp_required: 5000 },
      { name: "Carbon Buster",     icon: "💚", description: "Help cut 100 tCO₂ from your department",  xp_required: 800  },
      { name: "Tree Hugger",       icon: "🌲", description: "Plant 20+ trees across all activities",   xp_required: 400  },
    ])
    .select();
  if (badErr) { console.error("Badge error:", badErr.message); process.exit(1); }
  const badMap: Record<string, string> = {};
  bads!.forEach((b) => (badMap[b.name] = b.id));
  console.log(`   ✓ ${bads!.length} badges`);

  // ── Employee Badges ────────────────────────────────────────
  await supabase.from("employee_badges").insert([
    { employee_id: empMap["Priya Sharma"],  badge_id: badMap["Green Warrior"],     earned_at: new Date().toISOString() },
    { employee_id: empMap["Priya Sharma"],  badge_id: badMap["Compliance Master"], earned_at: new Date().toISOString() },
    { employee_id: empMap["Arjun Mehta"],   badge_id: badMap["Eco Hero"],          earned_at: new Date().toISOString() },
    { employee_id: empMap["Arjun Mehta"],   badge_id: badMap["Green Warrior"],     earned_at: new Date().toISOString() },
    { employee_id: empMap["Sneha Patel"],   badge_id: badMap["Compliance Master"], earned_at: new Date().toISOString() },
    { employee_id: empMap["Sneha Patel"],   badge_id: badMap["Tree Hugger"],       earned_at: new Date().toISOString() },
    { employee_id: empMap["Rahul Verma"],   badge_id: badMap["Carbon Buster"],     earned_at: new Date().toISOString() },
    { employee_id: empMap["Kavya Nair"],    badge_id: badMap["Green Warrior"],     earned_at: new Date().toISOString() },
    { employee_id: empMap["Meera Joshi"],   badge_id: badMap["Compliance Master"], earned_at: new Date().toISOString() },
  ]);
  console.log("   ✓ Employee badges");

  // ── 10. REWARDS ───────────────────────────────────────────
  console.log("🎁 Seeding rewards...");
  await supabase.from("rewards").insert([
    { name: "Amazon Voucher ₹500",   icon: "🛒", xp_cost: 500,  category: "Shopping",   stock: 20  },
    { name: "Movie Tickets (2)",     icon: "🎬", xp_cost: 400,  category: "Experience",  stock: 15  },
    { name: "Coffee Coupon",         icon: "☕", xp_cost: 150,  category: "Food",        stock: 50  },
    { name: "Extra Leave Day",       icon: "🏖️", xp_cost: 1000, category: "Benefit",     stock: 5   },
    { name: "Gift Card ₹1000",       icon: "🎁", xp_cost: 800,  category: "Shopping",    stock: 10  },
    { name: "Certificate of Merit",  icon: "🏆", xp_cost: 200,  category: "Recognition", stock: 100 },
    { name: "Zomato Voucher ₹300",   icon: "🍕", xp_cost: 300,  category: "Food",        stock: 30  },
    { name: "Eco Product Bundle",    icon: "♻️", xp_cost: 600,  category: "Green",       stock: 8   },
  ]);
  console.log("   ✓ Rewards");

  // ── 11. AUDITS ────────────────────────────────────────────
  console.log("🔍 Seeding audits...");
  await supabase.from("audits").insert([
    {
      title: "Q2 Environmental Compliance Audit",
      department_id: deptMap["Operations"],
      auditor_id: empMap["Meera Joshi"],
      checklist: JSON.stringify([
        { item: "Carbon transaction records complete", done: true },
        { item: "Emission factor references valid",    done: true },
        { item: "ESG goals documented",               done: false },
      ]),
      result: "partial",
      remarks: "Carbon records complete but ESG goals need documentation.",
      audit_date: daysAgo(10),
    },
    {
      title: "Data Privacy Compliance Review",
      department_id: deptMap["Engineering"],
      auditor_id: empMap["Meera Joshi"],
      checklist: JSON.stringify([
        { item: "Policy acknowledged by all staff",  done: true },
        { item: "Data handling procedures followed", done: true },
        { item: "Incident response plan in place",   done: true },
      ]),
      result: "pass",
      remarks: "Full compliance achieved. Well done team.",
      audit_date: daysAgo(5),
    },
  ]);
  console.log("   ✓ Audits");

  // ── 12. COMPLIANCE ISSUES ─────────────────────────────────
  console.log("⚠️  Seeding compliance issues...");
  await supabase.from("compliance_issues").insert([
    { title: "Overdue Carbon Report — Operations Q1",  description: "Q1 carbon report not submitted by deadline.",     department_id: deptMap["Operations"],  owner_id: empMap["Kavya Nair"],   severity: "high",     deadline: daysAgo(15), status: "open"       },
    { title: "Missing Policy Acknowledgement — Sales",  description: "3 sales employees haven't accepted Code of Conduct.", department_id: deptMap["Sales"],       owner_id: empMap["Aditya Kumar"], severity: "medium",   deadline: daysFromNow(5), status: "in_progress" },
    { title: "Air Travel Pre-approval Skipped",        description: "Finance team traveled without prior ESG approval.", department_id: deptMap["Finance"],     owner_id: empMap["Rahul Verma"],  severity: "low",      deadline: daysFromNow(10),status: "open"       },
    { title: "CSR Proof Upload Overdue",               description: "8 employees haven't uploaded CSR proof.",           department_id: null,                   owner_id: empMap["Meera Joshi"],  severity: "medium",   deadline: daysFromNow(3), status: "open"       },
  ]);
  console.log("   ✓ Compliance issues");

  // ── 13. NOTIFICATIONS ─────────────────────────────────────
  console.log("🔔 Seeding notifications...");
  const notifEmpId = empMap["Priya Sharma"];
  await supabase.from("notifications").insert([
    { employee_id: notifEmpId, type: "badge",     title: "Badge Earned!",            message: "You earned the Green Warrior badge 🌿",         icon: "🌿", read: false },
    { employee_id: notifEmpId, type: "challenge", title: "Challenge Completed!",     message: "Zero Plastic Week completed. +300 XP awarded!",  icon: "🏆", read: false },
    { employee_id: notifEmpId, type: "policy",    title: "New Policy Published",     message: "ESG Reporting Guidelines v1.0 is now available.", icon: "📋", read: false },
    { employee_id: notifEmpId, type: "csr",       title: "CSR Participation Approved",message: "Blood Donation Camp participation approved.",    icon: "✅", read: true  },
    { employee_id: notifEmpId, type: "carbon",    title: "Carbon Goal Progress",     message: "Operations is 78% toward Q3 carbon target.",    icon: "📉", read: true  },
  ]);
  console.log("   ✓ Notifications");

  console.log("\n✅ Seed complete! GreenPulse database is ready.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
