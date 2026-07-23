import { LocaleToggle } from "@/components/locale-toggle";
import { PlayerCard } from "@/components/player-card";
import { SectionMenu } from "@/components/section-menu";
import { ThemeToggle } from "@/components/theme-toggle";

// Elementos flotantes presentes en todas las páginas (menú, avatar, toggles).
export function SiteChrome() {
  return (
    <>
      {/* Menú de secciones (arriba a la izquierda) */}
      <SectionMenu />

      {/* Línea vertical que conecta el menú con el avatar */}
      <div className="pointer-events-none fixed left-15 top-20 bottom-24 z-30 hidden w-px bg-muted-foreground/60 lg:block" />

      {/* 3 triángulos en la punta superior de la línea */}
      <div className="pointer-events-none fixed left-15 top-20 z-40 hidden -translate-x-1/2 flex-col items-center gap-0.5 lg:flex">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="size-0 border-x-[5px] border-b-8 border-x-transparent border-b-primary"
          />
        ))}
      </div>

      {/* Avatar flotante tipo videojuego (contacto + CV) */}
      <PlayerCard />

      {/* Controles flotantes de idioma y tema */}
      <div className="fixed right-4 top-4 z-50 flex items-center gap-1 rounded-full border border-border bg-card/70 px-1 py-1 backdrop-blur-md lg:right-10 lg:top-7">
        <LocaleToggle />
        <ThemeToggle />
      </div>
    </>
  );
}
