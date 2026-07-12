interface DividerProps {
  text?: string;
}

export function Divider({ text = "or continue with" }: DividerProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-[hsl(var(--border))]" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-3 text-xs text-[hsl(var(--foreground-subtle))] bg-white dark:bg-[hsl(var(--background))]">
          {text}
        </span>
      </div>
    </div>
  );
}
