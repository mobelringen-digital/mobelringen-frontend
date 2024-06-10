/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eu-west-2.graphassets.com",
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
};

export default nextConfig;
