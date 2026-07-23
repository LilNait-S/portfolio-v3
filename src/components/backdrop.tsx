// Fondo decorativo reutilizable: esferas degradadas (rompen la cuadrícula) +
// shards irregulares y puntos en gris suave. Puramente estético.
export function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Esferas degradadas: usan el color del fondo para "borrar" la cuadrícula */}
      <div className="absolute -left-24 top-8 size-[520px] rounded-full bg-[radial-gradient(circle,var(--background)_42%,transparent_72%)]" />
      <div className="absolute left-1/3 -bottom-32 size-[560px] rounded-full bg-[radial-gradient(circle,var(--background)_45%,transparent_72%)]" />
      <div className="absolute -right-16 top-1/4 size-[480px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary),transparent_85%)_0%,transparent_70%)]" />

      {/* Shards + puntos */}
      <svg
        className="absolute inset-0 h-full w-full text-muted-foreground"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <pattern
            id="backdrop-dots"
            width="18"
            height="18"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
          </pattern>
        </defs>

        <rect x="60" y="40" width="230" height="140" fill="url(#backdrop-dots)" opacity="0.1" />
        <rect x="980" y="470" width="180" height="150" fill="url(#backdrop-dots)" opacity="0.08" />

        <g fill="currentColor">
          <path d="M540 40 L660 55 L600 150 L560 120 Z" opacity="0.1" />
          <path d="M905 240 L995 265 L960 350 L915 320 Z" opacity="0.08" />
          <path d="M1040 110 L1130 140 L1095 205 Z" opacity="0.07" />
          <path d="M110 500 L195 520 L160 590 L125 560 Z" opacity="0.08" />
          <path d="M760 480 L900 445 L870 500 L800 545 Z" opacity="0.07" />
          <path d="M300 250 L360 230 L345 300 Z" opacity="0.09" />
        </g>

        <g fill="currentColor" opacity="0.16">
          <path d="M470 300 l14 4 -6 12 z" />
          <path d="M1000 360 l12 6 -10 8 z" />
          <path d="M330 170 l-12 4 6 12 z" />
        </g>
      </svg>
    </div>
  );
}
