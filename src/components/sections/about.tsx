import { Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/section-label";

export function About() {
  const t = useTranslations("about");

  return (
    <section
      id="about"
      className="relative scroll-mt-20 border-b border-border pt-16 pb-28 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:px-16">
        {/* ── Texto ──────────────────────────────────────────── */}
        <div>
          <SectionLabel>{t("label")}</SectionLabel>
          <p className="mt-8 text-base leading-relaxed text-muted-foreground">
            {t("p1")}
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {t("p2")}
          </p>
        </div>

        {/* ── Cita destacada ─────────────────────────────────── */}
        <div className="brackets relative rounded-tr-lg rounded-bl-lg border border-border bg-card/60 p-8 backdrop-blur-sm md:p-10">
          <Quote className="size-6 fill-primary text-primary" />
          <p className="mt-5 text-2xl font-bold leading-snug">
            {t("quote")}
          </p>
        </div>
      </div>
    </section>
  );
}
