import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // El dominio antiguo redirige al dominio propio para no romper enlaces viejos.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "lilnait.vercel.app" }],
        destination: "https://sergio.naitlabs.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
