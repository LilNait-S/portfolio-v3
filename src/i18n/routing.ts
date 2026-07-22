import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // ES como fallback; EN disponible. La detección real la hace el middleware
  // según el Accept-Language del navegador.
  locales: ["es", "en"],
  defaultLocale: "es",
  // La ruta por defecto (es) queda sin prefijo; el resto usa /en.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
