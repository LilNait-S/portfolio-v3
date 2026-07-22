"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleToggle() {
  const locale = useLocale();
  const pathname = usePathname();

  const next = locale === "es" ? "en" : "es";

  // Navegación completa (no soft nav): evita re-renderizar en cliente el
  // <script> de next-themes, que React 19 rechaza. El tema persiste vía
  // localStorage. Con localePrefix "as-needed", "es" no lleva prefijo.
  function switchLocale() {
    const clean = pathname === "/" ? "" : pathname;
    const target = next === "es" ? clean || "/" : `/en${clean}`;
    window.location.href = target;
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="font-mono text-xs tracking-wider"
      aria-label="Cambiar idioma"
      onClick={switchLocale}
    >
      {locale === "es" ? "ES / EN" : "EN / ES"}
    </Button>
  );
}
