import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: ['res.cloudinary.com'], // ✅ allow cloudinary images
  },
};

export default nextConfig;
