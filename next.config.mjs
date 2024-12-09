import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: false,
    serverActions: true,
  },
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          ...(process.env.NEXT_PUBLIC_ENVIRONMENT !== "Production"
            ? [
                {
                  key: "X-Robots-Tag",
                  value: "noindex",
                },
              ]
            : []),
          {
            key: "Cache-Control",
            value: "s-maxage=300, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu-central-1-shared-euc1-02.graphassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.mobelringen.no",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mobelringen2-oazgdgy-bgqwzy7ueagk4.eu-3.magentosite.cloud",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/5-tips-nar-du-skal-fornye-stuen",
        destination: "/inspirasjon/gode-tips-når-du-skal-fornye-stuen",
        permanent: true,
      },

      {
        source: "/betaling-og-finansiering",
        destination: "/kundeservice/betaling-og-finansiering",
        permanent: true,
      },

      {
        source: "/blackweek",
        destination: "/salg/blackweek",
        permanent: true,
      },

      {
        source: "/butikker/mobelringen-sortlands-mobelsenter",
        destination: "/finn-butikk",
        permanent: true,
      },

      {
        source: "/butikker/telemark/wm-rjukan-interiorsenter-a-s/nb",
        destination: "/finn-butikk",
        permanent: true,
      },

      {
        source: "/finn-trysil-vinn-trysil",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/forus",
        destination: "/finn-butikk",
        permanent: true,
      },

      {
        source: "/hjem/nb",
        destination: "/",
        permanent: true,
      },

      {
        source: "/home",
        destination: "/",
        permanent: true,
      },

      {
        source: "/inn-i-komfortsonen",
        destination: "/inspirasjon/inn-i-komfortsonen",
        permanent: true,
      },

      {
        source: "/inspirasjon/mange-muligheter-med-moduler",
        destination: "/inspirasjon/hva-er-en-modulsofa",
        permanent: true,
      },

      {
        source: "/julesalg",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/kjopsbetingelser-for-netthandel",
        destination: "/kundeservice/kjopsbetingelser",
        permanent: true,
      },

      {
        source: "/klikk-og-hent",
        destination: "/kundeservice/handle-med-klikk-og-hent",
        permanent: true,
      },

      {
        source: "/konkurranse",
        destination: "/salg/konkurranse",
        permanent: true,
      },

      {
        source: "/kontakt-oss",
        destination: "/kundeservice/kontakt-oss",
        permanent: true,
      },

      {
        source: "/levering-og-montering",
        destination: "/kundeservice/levering-og-montering",
        permanent: true,
      },

      {
        source: "/medlemsvilkar",
        destination: "/kundeklubb/medlemsvilkar",
        permanent: true,
      },

      {
        source: "/mobler",
        destination: "/",
        permanent: true,
      },

      {
        source: "/ofte-stilte-sporsmal",
        destination: "/kundeservice/ofte-stilte-sporsmal",
        permanent: true,
      },

      {
        source: "/proveligg",
        destination: "/inspirasjon/proveligg",
        permanent: true,
      },

      {
        source: "/reklamasjon",
        destination: "/kundeservice/reklamasjon",
        permanent: true,
      },

      {
        source: "/retur",
        destination: "/kundeservice/retur",
        permanent: true,
      },

      {
        source: "/ryddesalg",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/salg2022-1",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/salg2023-1",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/salg2024-1",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/sommersalg",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/soveromsdager",
        destination: "/soverom",
        permanent: true,
      },

      {
        source: "/spisestuedager",
        destination: "/spiseplass",
        permanent: true,
      },

      {
        source: "/stuedager",
        destination: "/stue",
        permanent: true,
      },

      {
        source: "/vip-uke",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/hoestens-nyheter2022",
        destination: "/salg",
        permanent: true,
      },

      {
        source: "/handle-hos-mobelringen",
        destination: "/kundeservice",
        permanent: true,
      },

      {
        source: "/kvalitet",
        destination: "/",
        permanent: true,
      },

      {
        source: "/mobelfakta",
        destination: "/",
        permanent: true,
      },

      {
        source: "/vedlikehold",
        destination: "/inspirasjon/vedlikehold",
        permanent: true,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: "alpha-solutions-norge",
  project: "mobelringen-frontend",
  telemetry: false,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
