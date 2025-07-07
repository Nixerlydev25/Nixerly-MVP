import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      "nixerly-bucket.s3.us-east-1.amazonaws.com",
      "nixerly-bucket.s3.eu-north-1.amazonaws.com"
    ],
  },
};

export default nextConfig;
