// Etiqueta de sección: línea corta morada + texto en mono (— LABEL).
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-primary" />
      <span className="font-mono text-xs font-medium tracking-[0.3em] text-primary">
        {children}
      </span>
    </div>
  );
}
