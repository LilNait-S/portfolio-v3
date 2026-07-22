import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { LocaleToggle } from "@/components/locale-toggle";
import { SectionMenu } from "@/components/section-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      {/* Menú de secciones (arriba a la izquierda) */}
      <SectionMenu />

      {/* Controles flotantes de idioma y tema */}
      <div className="fixed right-10 top-5 z-50 flex items-center gap-1 rounded-full border border-border bg-card/70 px-1 py-1 backdrop-blur-md">
        <LocaleToggle />
        <ThemeToggle />
      </div>

      <Hero />
      <Work />

      {/* Siguientes secciones: Experiencia, Stack, Premios, Sobre mí */}
    </main>
  );
}
