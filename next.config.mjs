import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com", "pbs.twimg.com"],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@tremor/react"],
  },
};

export default withContentlayer(nextConfig);
