import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionLabel } from "@/components/section-label";

const ITEMS = ["inuba", "gato"] as const;

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-b border-border py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-16">
        <SectionLabel>{t("label")}</SectionLabel>

        <div className="mt-12 space-y-10">
          {ITEMS.map((key) => {
            const bullets = t.raw(`items.${key}.bullets`) as string[];
            return (
              <div
                key={key}
                className="grid grid-cols-1 gap-4 border-t border-dashed border-border pt-8 md:grid-cols-[220px_1fr] md:gap-10"
              >
                {/* Puesto / empresa / periodo */}
                <div>
                  <h3 className="text-lg font-bold">{t(`items.${key}.role`)}</h3>
                  <p className="mt-0.5 font-semibold text-primary">
                    {t(`items.${key}.company`)}
                  </p>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">
                    {t(`items.${key}.period`)}
                  </p>
                </div>

                {/* Resumen + bullets */}
                <div>
                  <p className="text-sm font-medium text-foreground/90">
                    {t(`items.${key}.summary`)}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
