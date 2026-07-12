"use client";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-[hsl(var(--foreground))]">
        {title}
      </h1>
      {description && (
        <p className="text-sm text-[hsl(var(--foreground-muted))] mt-2 leading-relaxed">
          {description}
        </p>
      )}
      <div className="mt-8 space-y-5">
        {children}
      </div>
    </div>
  );
}
