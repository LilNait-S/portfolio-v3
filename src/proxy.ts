import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Detecta el idioma por el navegador (Accept-Language) y redirige;
// guarda la preferencia en cookie para el cambio manual con el toggle.
export default createMiddleware(routing);

export const config = {
  // Todas las rutas salvo API, internos de Next y archivos con extensión.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
