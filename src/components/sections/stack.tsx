import { ArrowUpRight, ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { SectionLabel } from "@/components/section-label"
import { awardCertificateUrl, awardUrl } from "@/lib/site"

const GROUPS = [
  "frontend",
  "backend",
  "database",
  "architecture",
  "tools",
  "cloud",
] as const

export function Stack() {
  const t = useTranslations("stack")
  const ta = useTranslations("awards")
  const awardBullets = ta.raw("ethglobal.bullets") as string[]

  return (
    <section
      id="stack"
      className="relative scroll-mt-20 border-b border-border py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 lg:grid-cols-3 lg:px-16">
        {/* ── Stack técnico ──────────────────────────────────── */}
        <div className="lg:col-span-2">
          <SectionLabel>{t("label")}</SectionLabel>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {GROUPS.map((g) => {
              const items = t.raw(`groups.${g}.items`) as string[]
              return (
                <div key={g}>
                  <h4 className="font-mono text-xs font-medium tracking-[0.2em] text-primary">
                    {t(`groups.${g}.title`)}
                  </h4>
                  <ul className="mt-4 space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-sm text-foreground/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Premios ────────────────────────────────────────── */}
        <div>
          <SectionLabel>{ta("label")}</SectionLabel>

          <a
            href={awardUrl}
            target="_blank"
            rel="noreferrer"
            className="brackets group mt-10 block rounded-tr-lg rounded-bl-lg border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
          >
            <span className="text-3xl">🏆</span>
            <h3 className="mt-4 text-lg font-bold">{ta("ethglobal.title")}</h3>
            <p className="mt-1 font-mono text-xs font-medium tracking-[0.2em] text-primary">
              {ta("ethglobal.type")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {ta("ethglobal.summary")}
            </p>
            <ul className="mt-4 space-y-2">
              {awardBullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-foreground/90">
                  <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
          </a>

          <a
            href={awardCertificateUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
          >
            {ta("certificate")}
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}
