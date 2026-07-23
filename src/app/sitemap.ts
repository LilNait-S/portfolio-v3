import type { MetadataRoute } from "next";
import { projectSlugs, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Rutas base (home) en ambos idiomas.
  const paths = ["", "/en"];

  // Páginas de proyecto en ambos idiomas.
  for (const slug of projectSlugs) {
    paths.push(`/projects/${slug}`, `/en/projects/${slug}`);
  }

  return paths.map((path) => ({
    url: `${SITE_URL}${path || "/"}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
