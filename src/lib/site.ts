// Configuración editable del sitio: enlaces, CV y datos decorativos.
export const site = {
  name: "Sergio Delgado Arenas",
  nick: "Sergio Delgado",
  role: "Fullstack Developer",
  avatar: "/images/avatar.webp",
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
  { key: "zelterm", href: "/projects/zelterm" },
  { key: "aini28", href: "/projects/aini28" },
  { key: "catalystbet", href: "/projects/catalystbet" },
] as const;

// Sección "Trabajo seleccionado". Los textos vienen de las traducciones;
// aquí solo van tags técnicos (no traducibles) y enlaces (placeholders).
export const featuredProject = {
  key: "zelterm",
  tags: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Tailwind CSS"],
  demoUrl: "https://zelterm.com/",
  image: "/images/projects/zelterm.webp",
} as const;

// Enlace al showcase del premio (sección Premios).
export const awardUrl = "https://ethglobal.com/showcase/hack-the-world-3tw5n";
export const awardCertificateUrl = "/certificado-ethglobal.pdf";

// Datos por proyecto para las páginas de detalle (/projects/[slug]).
// El texto (overview, decisiones) vive en messages → work.projects.<slug>.
export const projects = {
  zelterm: {
    year: "2026",
    demoUrl: "https://zelterm.com/",
    repoUrl: "",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "NestJS 11",
      "Prisma 7",
      "PostgreSQL",
      "Tailwind CSS 4",
      "TanStack Query",
      "Zustand",
      "Turborepo",
      "Cloudflare R2",
      "Nubefact",
    ],
    gallery: ["/images/projects/zelterm.webp"],
  },
  aini28: {
    year: "2024",
    demoUrl: "https://aini28.com",
    repoUrl: "",
    stack: [
      "Next.js 15",
      "React 18",
      "TypeScript",
      "Tailwind CSS 4",
      "Sanity CMS",
      "Upstash Redis",
      "React Email",
      "Zustand",
      "Vercel",
    ],
    gallery: ["/images/projects/aini28.webp"],
  },
  catalystbet: {
    year: "2025",
    demoUrl: "https://catalystbet.vercel.app/",
    repoUrl: "https://github.com/LilNait-S/catalystbet",
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "wagmi v2",
      "viem",
      "RainbowKit",
      "SIWE / NextAuth",
      "TanStack Query",
      "Sonic testnet",
    ],
    gallery: ["/images/projects/catalystbet.webp"],
  },
} as const;

export type ProjectSlug = keyof typeof projects;
export const projectSlugs = Object.keys(projects) as ProjectSlug[];

export const sideProjects = [
  {
    key: "aini28",
    num: "02",
    href: "https://aini28.com",
    image: "/images/projects/aini28.webp",
  },
  {
    key: "catalystbet",
    num: "03",
    href: "https://catalystbet.vercel.app/",
    image: "/images/projects/catalystbet.webp",
  },
] as const;
