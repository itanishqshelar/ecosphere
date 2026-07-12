interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  center?: boolean;
}

export function SectionHeading({ label, title, description, center }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-[hsl(var(--foreground))]">
        {title}
      </h2>
      {description && (
        <p className="text-lg mt-3 text-[hsl(var(--foreground-muted))] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
