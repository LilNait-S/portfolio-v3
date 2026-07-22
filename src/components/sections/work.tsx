import { ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import { featuredProject, sideProjects } from "@/lib/site";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-8 bg-primary" />
      <span className="font-mono text-xs font-medium tracking-[0.3em] text-primary">
        {children}
      </span>
    </div>
  );
}

export function Work() {
  const t = useTranslations("work");
  const bullets = t.raw(
    `projects.${featuredProject.key}.bullets`,
  ) as string[];

  return (
    <section
      id="work"
      className="relative scroll-mt-20 border-b border-border py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <SectionLabel>{t("label")}</SectionLabel>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* ── Proyecto destacado ─────────────────────────────── */}
          <article className="brackets group flex flex-col rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm lg:col-span-2">
            {/* Vista previa (placeholder con franjas diagonales) */}
            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-[repeating-linear-gradient(45deg,var(--muted)_0_10px,transparent_10px_20px)]">
              <span className="font-mono text-xs tracking-widest text-muted-foreground">
                {t("previewPlaceholder")}
              </span>
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
                <li
                  key={b}
                  className="flex gap-2 text-sm text-foreground/90"
                >
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

            <a
              href={featuredProject.demoUrl}
              className="mt-6 flex w-fit items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-widest text-primary transition-colors hover:text-primary/80"
            >
              {t("liveDemo")}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </article>

          {/* ── Proyectos secundarios ──────────────────────────── */}
          <div className="flex flex-col gap-4">
            {sideProjects.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                className="brackets group flex flex-1 flex-col rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
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
                <span className="mt-auto flex items-center gap-1.5 pt-6 font-mono text-[11px] font-medium uppercase tracking-widest text-primary">
                  {t("viewProject")}
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
