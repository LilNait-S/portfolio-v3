import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { ArrowRight, ArrowUpRight, Code2, Download, Mail } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"
import { heroProjects, site } from "@/lib/site"

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
            className={`brackets group flex flex-col rounded-lg border backdrop-blur-sm transition-all hover:border-primary/50 ${
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
function SystemStatus({ className = "" }: { className?: string }) {
  const t = useTranslations("hero")

  return (
    <div
      // El borde izquierdo se corta en diagonal con el ángulo de la franja
      // morada. Al colocar el panel sobre la franja, parece que sale de ella.
      style={{ clipPath: "polygon(4.5% 0, 100% 0, 100% 100%, 21% 100%)" }}
      className={`brackets relative overflow-hidden rounded-xl border border-border bg-card/90 py-7 pl-24 pr-14 backdrop-blur-md ${className} rotate-6`}
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
  const ts = useTranslations("social")
  const locale = useLocale()
  const cvHref = locale === "en" ? site.cv.en : site.cv.es

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden border-b border-border"
    >
      {/* Fondo: cuadrícula + desvanecido radial */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,var(--primary),transparent_55%)] opacity-[0.12]" />

      {/* Franja diagonal morada que cruza por detrás del personaje */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[69%] top-1/2 z-0 hidden h-[130%] w-24 -translate-x-1/2 -translate-y-1/2 -rotate-[20deg] bg-gradient-to-b from-primary/70 via-primary to-primary/70 lg:block"
      />

      {/* Personaje (solo móvil): fondo atenuado */}
      <Image
        src="/images/hero.webp"
        alt=""
        priority
        width={1254}
        height={1254}
        className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[62%] w-auto max-w-none -translate-x-1/2 select-none opacity-20 sm:h-[75%] sm:opacity-30 lg:hidden"
      />

      {/* ── Personaje + tarjetas (escritorio): mismo contenedor ───── */}
      {/* El wrapper se ajusta al ancho de la imagen, así las tarjetas
          quedan ancladas al borde derecho del personaje, no de la página. */}
      <div className="absolute bottom-0 left-[62%] hidden h-[94%] -translate-x-1/2 lg:block">
        <Image
          src="/images/hero.webp"
          alt=""
          priority
          width={1254}
          height={1254}
          className="pointer-events-none h-full w-auto max-w-none select-none"
        />
        {/* Tarjetas ancladas al borde derecho de la imagen (solapan un poco) */}
        <div className="absolute right-24 top-2/5 z-20 w-52 -translate-y-1/2 translate-x-[35%]">
          <ProjectCards fan />
        </div>

        {/* Panel SYSTEM STATUS: la franja morada pasa por detrás y da la
          impresión de que el panel sale de ella. */}
        <div className="absolute right-24 top-10/12 z-20 w-52 -translate-y-1/2 translate-x-[35%]">
          <SystemStatus className="pointer-events-auto absolute left-1/2 top-[70%] z-30 hidden w-96 -translate-x-1/2 lg:block" />
        </div>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 lg:px-16">
        {/* ── Contenido (izquierda) ────────────────────────────── */}
        <div className="pointer-events-auto max-w-xl">
          <p className="flex items-center gap-2 font-mono text-xs font-medium tracking-[0.3em] text-primary">
            {t("role")}
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl">
            {t("titleLine1")}{" "}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h1>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#work"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 px-6 text-sm",
              )}
            >
              {t("ctaWork")}
              <ArrowUpRight className="size-4" />
            </Link>
            <a
              href={cvHref}
              download
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 px-6 text-sm",
              )}
            >
              {t("ctaCv")}
              <Download className="size-4" />
            </a>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href={site.links.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <GithubIcon className="size-4" />
              {ts("github")}
            </a>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <LinkedinIcon className="size-4" />
              {ts("linkedin")}
            </a>
            <a
              href={site.links.email}
              className="flex items-center gap-2 transition-colors hover:text-primary"
            >
              <Mail className="size-4" />
              {ts("email")}
            </a>
          </div>
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
