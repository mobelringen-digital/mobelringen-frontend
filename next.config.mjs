/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
    ],
  },
};

export default nextConfig;
