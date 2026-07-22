// Configuración editable del sitio: enlaces, CV y datos decorativos.
export const site = {
  name: "Sergio Delgado Arenas",
  handle: "SERGIO.DEV",
  location: "Lima, Perú",
  // Coordenadas decorativas del hero (Lima).
  coords: "12.0464° S, 77.0428° W",
  // CV por idioma (usado por el botón "Descargar CV").
  cv: {
    es: "/cv-sergio-delgado-es.pdf",
    en: "/cv-sergio-delgado-en.pdf",
  },
  links: {
    website: "https://lilnait.vercel.app",
    github: "https://github.com/LilNait-S",
    linkedin: "https://www.linkedin.com/in/sergio-delgado-arenas",
    email: "mailto:lilnait.santos@gmail.com",
  },
} as const;

// Proyectos destacados del hero (orden = numeración 01, 02, 03).
// El texto viene de las traducciones (messages/*.json → work.projects).
export const heroProjects = [
  { key: "zelterm", href: "#work" },
  { key: "schedule", href: "#work" },
  { key: "catalystbet", href: "#work" },
] as const;

// Sección "Trabajo seleccionado". Los textos vienen de las traducciones;
// aquí solo van tags técnicos (no traducibles) y enlaces (placeholders).
export const featuredProject = {
  key: "zelterm",
  tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Tailwind CSS"],
  demoUrl: "https://zelterm.com/",
} as const;

// Enlace al showcase del premio (sección Premios).
export const awardUrl = "https://ethglobal.com/showcase/hack-the-world-3tw5n";

export const sideProjects = [
  { key: "schedule", num: "02", href: "https://schedule-app-snowy.vercel.app/login" },
  { key: "catalystbet", num: "03", href: "https://catalystbet.vercel.app/" },
] as const;
