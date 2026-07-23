import { ArrowRight, ArrowUpRight, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"
import { featuredProject, sideProjects } from "@/lib/site"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-primary" />
      <span className="font-mono text-xs font-medium tracking-[0.3em] text-primary">
        {children}
      </span>
    </div>
  )
}

export function Work() {
  const t = useTranslations("work")
  const bullets = t.raw(`projects.${featuredProject.key}.bullets`) as string[]

  return (
    <section
      id="work"
      className="relative scroll-mt-20 border-b border-border py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <SectionLabel>{t("label")}</SectionLabel>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* ── Proyecto destacado ─────────────────────────────── */}
          <article className="brackets group flex flex-col rounded-tr-xl rounded-bl-xl border border-border bg-card/60 p-6 backdrop-blur-sm lg:col-span-2">
            {/* Vista previa del proyecto */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
              <img
                src={featuredProject.image}
                alt={t(`projects.${featuredProject.key}.name`)}
                className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>

            <p className="mt-6 flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.25em] text-primary">
              <Star className="size-3 fill-primary" />
              {t("featuredTag")}
            </p>

            <h3 className="mt-2 text-2xl font-bold text-primary">
              {t(`projects.${featuredProject.key}.name`)}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {t(`projects.${featuredProject.key}.summary`)}
            </p>

            <ul className="mt-4 space-y-2">
              {bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-foreground/90">
                  <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {featuredProject.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-primary/30 font-mono text-[11px] text-primary"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${featuredProject.key}`}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {t("viewDetails")}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={featuredProject.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
              >
                {t("liveDemo")}
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </article>

          {/* ── Proyectos secundarios ──────────────────────────── */}
          <div className="flex flex-col gap-4">
            {sideProjects.map((p) => (
              <Link
                key={p.key}
                href={`/projects/${p.key}`}
                className="brackets group flex flex-1 flex-col rounded-tr-xl rounded-bl-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
              >
                <span className="font-mono text-2xl font-bold text-primary">
                  {p.num}
                </span>
                <h3 className="mt-2 text-lg font-semibold">
                  {t(`projects.${p.key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`projects.${p.key}.summary`)}
                </p>
                {/* Vista previa (debajo de la descripción) */}
                <div className="relative mt-4 aspect-video w-full overflow-hidden rounded-lg border border-border">
                  <img
                    src={p.image}
                    alt={t(`projects.${p.key}.name`)}
                    className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
