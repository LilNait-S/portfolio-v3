import { ArrowLeft, ArrowUpRight, ChevronRight } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Backdrop } from "@/components/backdrop"
import { Gallery } from "@/components/gallery"
import { Reveal } from "@/components/motion/reveal"
import { GithubIcon } from "@/components/icons"
import { SectionLabel } from "@/components/section-label"
import { Badge } from "@/components/ui/badge"
import { Link } from "@/i18n/navigation"
import { projects, projectSlugs, type ProjectSlug } from "@/lib/site"

type Decision = { title: string; body: string }

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!projectSlugs.includes(slug as ProjectSlug)) return {}
  const t = await getTranslations({ locale, namespace: "work" })
  return {
    title: `${t(`projects.${slug}.name`)} — Sergio Delgado`,
    description: t(`projects.${slug}.summary`),
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!projectSlugs.includes(slug as ProjectSlug)) notFound()
  setRequestLocale(locale)

  const project = projects[slug as ProjectSlug]
  const t = await getTranslations({ locale, namespace: "work" })
  const decisions = t.raw(`projects.${slug}.decisions`) as Decision[]
  const challenges = t.raw(`projects.${slug}.challenges`) as string[]

  const infoRows = [
    { label: t("detail.type"), value: t(`projects.${slug}.meta.type`) },
    { label: t("detail.role"), value: t(`projects.${slug}.meta.role`) },
    { label: t("detail.status"), value: t(`projects.${slug}.meta.status`) },
    { label: t("detail.year"), value: project.year },
  ]

  return (
    <main className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
      <Backdrop />

      <div className="relative mx-auto max-w-6xl px-6 pt-14 pb-28 sm:py-20 lg:px-8">
        {/* Volver */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          {t("detail.back")}
        </Link>

        {/* Cabecera */}
        <header className="mt-10">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {t(`projects.${slug}.name`)}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            {t(`projects.${slug}.summary`)}
          </p>
        </header>

        {/* ── 2 columnas: contenido + ficha sticky ─────────────── */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
          {/* Columna izquierda: fotos + detalles */}
          <div className="order-2 lg:order-1">
            {/* Galería */}
            <Gallery
              images={project.gallery}
              alt={t(`projects.${slug}.name`)}
            />

            {/* Overview */}
            <section className="mt-14">
              <SectionLabel>{t("detail.overview")}</SectionLabel>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {t(`projects.${slug}.overview`)}
              </p>
            </section>

            {/* Decisiones clave */}
            <section className="mt-14">
              <SectionLabel>{t("detail.decisions")}</SectionLabel>
              <div className="mt-8 space-y-6">
                {decisions.map((d, i) => (
                  <Reveal
                    key={d.title}
                    delay={i * 0.08}
                    className="brackets rounded-tr-xl rounded-bl-xl border border-border bg-card/60 p-6 backdrop-blur-sm"
                  >
                    <h3 className="flex items-center gap-2 font-semibold">
                      <ChevronRight className="size-4 text-primary" />
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {d.body}
                    </p>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Retos y aprendizajes */}
            <section className="mt-14">
              <SectionLabel>{t("detail.challenges")}</SectionLabel>
              <ul className="mt-6 space-y-3">
                {challenges.map((c) => (
                  <li
                    key={c}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <ChevronRight className="mt-0.5 size-4 shrink-0 text-primary" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Columna derecha: ficha técnica sticky */}
          <aside className="order-1 lg:order-2 lg:sticky lg:top-24 lg:h-fit">
            <div className="brackets rounded-tr-xl rounded-bl-xl border border-border bg-card/60 p-6 backdrop-blur-sm">
              <p className="font-mono text-[11px] font-medium tracking-[0.25em] text-primary">
                {t("detail.info")}
              </p>

              <dl className="mt-5 space-y-3 border-t border-dashed border-border pt-5">
                {infoRows.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <dt className="font-mono text-xs text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="text-right text-sm font-medium">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Stack */}
              <div className="mt-5 border-t border-dashed border-border pt-5">
                <p className="font-mono text-xs text-muted-foreground">
                  {t("detail.stack")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="border-primary/30 font-mono text-[11px] text-primary"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Enlaces */}
              <div className="mt-6 flex flex-col gap-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {t("liveDemo")}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <GithubIcon className="size-4" />
                    {t("detail.repo")}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
