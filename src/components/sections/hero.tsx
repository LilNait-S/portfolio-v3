import { useTranslations } from "next-intl"
import { ArrowRight, Code2 } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { heroProjects } from "@/lib/site"

// Capa decorativa del fondo: puntos, triángulos con contorno y líneas diagonales
// en gris suave. Puramente estética, detrás de todo.
function HeroDecor() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full text-muted-foreground"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      <defs>
        <pattern
          id="hero-dots"
          width="18"
          height="18"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
        </pattern>
      </defs>

      {/* Clústeres de puntos */}
      <rect
        x="60"
        y="40"
        width="230"
        height="140"
        fill="url(#hero-dots)"
        opacity="0.1"
      />
      <rect
        x="980"
        y="470"
        width="180"
        height="150"
        fill="url(#hero-dots)"
        opacity="0.08"
      />

      {/* Shards irregulares rellenos (gris). Cada punto es un par "x y". */}
      <g fill="currentColor">
        <path d="M540 40 L660 55 L600 150 L560 120 Z" opacity="0.1" />
        <path d="M905 240 L995 265 L960 350 L915 320 Z" opacity="0.08" />
        <path d="M1040 110 L1130 140 L1095 205 Z" opacity="0.07" />
        <path d="M110 500 L195 520 L160 590 L125 560 Z" opacity="0.08" />
        <path d="M760 480 L900 445 L870 500 L800 545 Z" opacity="0.07" />
        <path d="M300 250 L360 230 L345 300 Z" opacity="0.09" />
      </g>

      {/* Pequeños shards de acento */}
      <g fill="currentColor" opacity="0.16">
        <path d="M470 300 l14 4 -6 12 z" />
        <path d="M1000 360 l12 6 -10 8 z" />
        <path d="M330 170 l-12 4 6 12 z" />
      </g>
    </svg>
  )
}

// Tarjetas de proyectos + panel de estado (reutilizadas en móvil y escritorio).
// `fan` activa el efecto abanico: cada card se rota y desplaza progresivamente.
function ProjectCards({ fan = false }: { fan?: boolean }) {
  const tw = useTranslations("work")

  // Efecto abanico: cada card gira desde un pivote a la izquierda (lado de la
  // imagen), así parece que orbitan alrededor del personaje. La primera ya
  // arranca con un ángulo base.
  const fanStyle = (i: number, extra = "") =>
    fan
      ? {
          transform: `rotate(${2 + i * 3}deg) ${extra}`.trim(),
          transformOrigin: "left center",
        }
      : undefined

  return (
    <div className="flex flex-col gap-3">
      {heroProjects.map((p, i) => {
        const featured = i === 0
        return (
          <Link
            key={p.key}
            href={p.href}
            style={fanStyle(i)}
            className={`brackets group flex flex-col rounded-tr-lg rounded-bl-lg border backdrop-blur-sm transition-all hover:border-primary/50 ${
              featured
                ? "z-10 -mx-2 border-primary/40 bg-card px-6 pb-6 pt-9 shadow-lg shadow-primary/20"
                : "border-border bg-card/80 px-4 py-5 opacity-90 hover:bg-card"
            }`}
          >
            <span
              className={`font-mono font-bold leading-none text-primary ${
                featured ? "text-6xl" : "text-3xl"
              }`}
            >
              0{i + 1}
            </span>
            <h3
              className={`font-semibold ${
                featured ? "mt-5 text-2xl" : "mt-3 text-sm"
              }`}
            >
              {tw(`projects.${p.key}.name`)}
            </h3>
            <p
              className={`mt-1 text-muted-foreground ${
                featured ? "text-sm" : "text-[11px]"
              }`}
            >
              {tw(`projects.${p.key}.short`)}
            </p>
            {featured && (
              <span className="mt-4 flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-widest text-primary">
                {tw("viewProject")}
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            )}
          </Link>
        )
      })}
    </div>
  )
}

// Panel SYSTEM STATUS: ancho, con mucho padding. Se coloca de modo que la
// franja morada pase por detrás y parezca que el panel sale de ella.
// `floating` activa el efecto de escritorio (corte diagonal + rotación) para
// que parezca salir de la franja. Sin él, se muestra como una card normal
// (para el apilado móvil, igual que ProjectCards).
function SystemStatus({
  className = "",
  floating = false,
}: {
  className?: string
  floating?: boolean
}) {
  const t = useTranslations("hero")

  return (
    <div
      style={
        floating
          ? { clipPath: "polygon(4.5% 0, 100% 0, 100% 100%, 21% 100%)" }
          : undefined
      }
      className={`brackets rounded-tr-xl rounded-bl-xl border border-border bg-card/90 backdrop-blur-md ${
        floating ? "rotate-6 py-7 pl-24 pr-14" : "p-5"
      } ${className}`}
    >
      <Code2 className="absolute right-5 top-5 size-5 text-primary/60" />
      <p className="font-mono text-[11px] tracking-[0.3em] text-muted-foreground">
        {t("systemStatus")}
      </p>
      <p className="mt-3 max-w-[85%] font-mono text-base font-semibold leading-snug text-foreground">
        {t("systemReady")}
      </p>
    </div>
  )
}

export function Hero() {
  const t = useTranslations("hero")

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden border-b border-border"
    >
      {/* Fondo: cuadrícula + desvanecido radial + formas decorativas */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,var(--primary),transparent_55%)] opacity-[0.12]" />

      {/* Esferas degradadas: usan el color del fondo para "borrar" la cuadrícula
          en zonas y crear áreas lisas. La última añade un tinte morado. */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-24 top-8 size-[520px] rounded-full bg-[radial-gradient(circle,var(--background)_42%,transparent_72%)]" />
        <div className="absolute left-1/3 -bottom-32 size-[560px] rounded-full bg-[radial-gradient(circle,var(--background)_45%,transparent_72%)]" />
        <div className="absolute -right-16 top-1/4 size-[480px] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary),transparent_85%)_0%,transparent_70%)]" />
      </div>

      <HeroDecor />

      {/* Franja diagonal morada que cruza por detrás del personaje */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[69%] top-1/2 z-0 hidden h-[130%] w-24 -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] bg-gradient-to-b from-primary/70 via-primary to-primary/70 lg:block"
      />

      {/* Personaje (solo móvil): fondo atenuado */}
      <img
        src="/images/hero.webp"
        alt=""
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[62%] w-auto max-w-none -translate-x-1/2 select-none opacity-20 sm:h-[75%] sm:opacity-30 lg:hidden"
      />

      {/* ── Personaje + tarjetas (escritorio): mismo contenedor ───── */}
      {/* El wrapper se ajusta al ancho de la imagen, así las tarjetas
          quedan ancladas al borde derecho del personaje, no de la página. */}
      <div className="absolute bottom-0 left-[62%] hidden h-[94%] -translate-x-1/2 lg:block">
        <img
          src="/images/hero.webp"
          alt=""
          className="pointer-events-none h-full w-auto max-w-none select-none"
        />
        {/* Tarjetas ancladas al borde derecho de la imagen (solapan un poco) */}
        <div className="absolute right-24 top-2/5 z-20 w-52 -translate-y-1/2 translate-x-[35%]">
          <ProjectCards fan />
        </div>
      </div>

      {/* Panel SYSTEM STATUS: el wrapper (absoluto) lo posiciona respecto a la
          sección; el panel va dentro. Así no ocupa espacio ni empuja nada. */}
      <div className="pointer-events-none absolute bottom-24 left-[69.4%] z-30 hidden w-96 lg:block">
        <SystemStatus floating />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 lg:px-16">
        {/* ── Contenido (izquierda) ────────────────────────────── */}
        <div className="pointer-events-auto max-w-xl">
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
            {t("titleLine1")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>
        </div>

        {/* Tarjetas en móvil (en flujo, debajo del contenido) */}
        <div className="pointer-events-auto relative z-20 mt-12 flex flex-col gap-3 lg:hidden">
          <ProjectCards />
          <SystemStatus />
        </div>
      </div>
    </section>
  )
}
