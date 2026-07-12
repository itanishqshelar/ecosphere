"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";
import { Code2, Database, Layout, Server, Zap, Globe } from "lucide-react";

const techStack = [
  { label: "Next.js", desc: "React Framework", Svg: NextjsLogo },
  { label: "TypeScript", desc: "Type Safety", Svg: TypescriptLogo },
  { label: "Tailwind CSS", desc: "Utility-First CSS", Svg: TailwindLogo },
  { label: "PostgreSQL", desc: "Relational Database", Svg: PostgresLogo },
  { label: "Supabase", desc: "Backend & Auth", Svg: SupabaseLogo },
  { label: "Framer Motion", desc: "Animations", Svg: MotionLogo },
];

function NextjsLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-black dark:text-white">
      <path d="M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l5.98 7.545c.235.297.528.544.86.731 1.418.904 2.387 2.457 2.387 4.229 0 .744-.148 1.453-.417 2.102l.029.029.011.01zM17.53 19.36c.385.3.663.697.787 1.155.108.397.108.815 0 1.212-.124.458-.402.855-.787 1.155-.385.3-.848.485-1.332.523-.484.038-.97-.07-1.393-.308-.422-.237-.758-.598-.977-1.035-.218-.437-.317-.931-.287-1.424.03-.493.18-.97.438-1.389.259-.419.62-.758 1.047-.99.428-.232.907-.35 1.393-.343.485.007.96.14 1.371.383l.007.007c.412.243.74.607.947 1.04l.012.024z"/>
    </svg>
  );
}

function TypescriptLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="#3178C6" className="w-5 h-5">
      <path d="M0 12v12h24V0H0v12zm19.341-.956c.61.152 1.074.423 1.501.865.221.236.549.666.575.77.008.03-1.036.73-1.668 1.123-.023.015-.115-.084-.217-.236-.31-.45-.633-.644-1.128-.678-.728-.05-1.196.331-1.192.967a.88.88 0 0 0 .102.45c.16.331.458.53 1.39.933 1.719.74 2.454 1.227 2.911 1.92.51.773.625 2.008.278 2.926-.38.998-1.325 1.676-2.655 1.9-.411.073-1.386.062-1.828-.018-.964-.172-1.878-.648-2.442-1.273-.221-.243-.652-.88-.625-.925.011-.016.11-.077.22-.141.108-.061.511-.294.892-.515l.69-.4.145.214c.202.308.643.731.91.872.766.404 1.817.347 2.335-.118a.883.883 0 0 0 .313-.72c0-.278-.035-.4-.18-.61-.186-.266-.567-.49-1.649-.96-1.238-.533-1.771-.864-2.259-1.39a3.165 3.165 0 0 1-.659-1.2c-.091-.339-.114-1.189-.042-1.531.255-1.2 1.158-2.03 2.461-2.278.423-.08 1.406-.05 1.82.051zm-5.634.475h-2.31v9.904H9.02V11.52H6.71V9.846h6.997v1.673z"/>
    </svg>
  );
}

function TailwindLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="#06B6D4" className="w-5 h-5">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>
  );
}

function PostgresLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="#4169E1" className="w-5 h-5">
      <path d="M22.082 15.174c-1.074-1.165-3.19-1.422-4.803-1.38.22-1.064.317-2.168.246-3.268-.104-1.611-.586-3.148-1.454-4.466-.469-.713-1.036-1.373-1.597-2.018-.729-.837-1.197-1.83-1.473-2.928-.448-1.775-.056-3.384.675-5.005.06-.132.135-.257.207-.384.304-.54.444-1.125.368-1.726-.117-.931-.704-1.43-1.584-1.446-.87-.016-1.582.44-1.933 1.214-.204.45-.293.936-.332 1.423-.048.599-.003 1.198.038 1.796.042.615.087 1.232.056 1.847-.061 1.196-.382 2.316-.968 3.332-.541.938-1.236 1.77-1.958 2.577-.67.75-1.294 1.54-1.752 2.432-.503.98-.78 2.034-.871 3.121-.048.574-.027 1.148.028 1.72.087.915.23 1.54.509 2.385-1.122-.104-2.163-.061-3.086.22-1.89.576-3.018 1.869-2.931 3.08.081 1.157 1.492 2.121 3.488 2.29.422.035.855.044 1.28.04.379-.003.76-.028 1.138-.033.815-.01 1.635.03 2.456.055.36.011.723.018 1.085.018 1.594 0 3.175-.152 4.702-.56 2.65-.709 4.622-2.113 5.416-3.725.462-.938.457-1.737.009-2.403zm-2.75 1.466c-.567 1.004-2.08 2.029-4.127 2.567-1.312.345-2.68.448-4.038.401-.436-.015-.874-.023-1.31-.034-.577-.014-1.155-.037-1.732-.037-.442 0-.885.029-1.328.038-.443.009-.89.011-1.33-.006-1.006-.039-1.827-.258-2.312-.615-.336-.248-.433-.535-.319-.763.23-.463 1.143-1.016 2.52-1.2.697-.093 1.418-.091 2.132-.06-.082.05-.162.103-.24.158-.908.637-1.33 1.286-.951 1.702.382.418 1.33.353 2.34-.23 1.004-.58 1.86-1.48 2.318-2.43.143-.296.246-.607.317-.93.246.072.481.168.701.29.82.453 1.245 1.111 1.166 1.785-.07.602-.548 1.173-1.353 1.604.02-.006.04-.013.059-.02l.048-.02z"/>
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="#3ECF8E" className="w-5 h-5">
      <path d="M21.362 9.354H12V.018l9.362 9.336zM12 9.354H2.638L12 24V9.354z" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  );
}

function MotionLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-rose-500">
      <rect x="2" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.6"/>
      <rect x="14" y="2" width="8" height="8" rx="2" fill="currentColor" opacity="0.8"/>
      <rect x="2" y="14" width="8" height="8" rx="2" fill="currentColor"/>
      <rect x="14" y="14" width="8" height="8" rx="2" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}

const architectureLayers = [
  { icon: Layout, label: "Frontend", tech: "Next.js 16 + React 19", desc: "Server Components, App Router, React Compiler", color: "text-primary-500" },
  { icon: Server, label: "Backend", tech: "Supabase + Next.js API", desc: "RESTful APIs, Server Actions, Edge Functions", color: "text-accent-500" },
  { icon: Database, label: "Database", tech: "PostgreSQL", desc: "Relational data with real-time subscriptions", color: "text-purple-500" },
  { icon: Zap, label: "Real-time", tech: "Supabase Realtime", desc: "Live data sync across all connected clients", color: "text-amber-500" },
  { icon: Globe, label: "Auth", tech: "Supabase Auth + Firebase", desc: "Multi-provider auth with MFA support", color: "text-emerald-500" },
  { icon: Code2, label: "Animations", tech: "Framer Motion + Recharts", desc: "Smooth animations and interactive charts", color: "text-rose-500" },
];

export function TechSection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Technology"
          title="Built on Modern Architecture"
          description="A scalable, enterprise-ready tech stack that ensures performance, security, and developer experience."
          center
        />

        {/* Tech icons */}
        <div className="flex flex-wrap justify-center gap-4 mt-14">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.06 }}
              className="card px-5 py-3 flex items-center gap-3 hover:shadow-card-hover transition-all"
            >
              <tech.Svg />
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{tech.label}</p>
                <p className="text-[10px] text-[hsl(var(--foreground-subtle))]">{tech.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-14 card p-6 lg:p-8" style={{ background: "hsl(var(--surface-elevated))" }}>
          <h4 className="text-sm font-semibold text-center text-[hsl(var(--foreground-muted))] mb-8 uppercase tracking-wider">Architecture Overview</h4>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {architectureLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative rounded-xl p-4 group hover:shadow-card-hover transition-all"
                style={{ background: "hsl(var(--surface-overlay))" }}
              >
                <div className={`w-8 h-8 rounded-lg ${layer.color.replace("text", "bg")}/10 flex items-center justify-center mb-2`}>
                  <layer.icon className={`w-4 h-4 ${layer.color}`} />
                </div>
                <h5 className="text-sm font-semibold text-[hsl(var(--foreground))]">{layer.label}</h5>
                <p className="text-xs font-mono text-primary-500 mt-0.5">{layer.tech}</p>
                <p className="text-[10px] text-[hsl(var(--foreground-subtle))] mt-1">{layer.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
