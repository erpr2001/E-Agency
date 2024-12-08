import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['via.placeholder.com'], // Add the domains you want to allow for optimized images
  },
  // reactStrictMode: true,


  async rewrites() {
    return [
      { source: '/login', destination: '/pages/login' },
      { source: '/register', destination: '/pages/register' },
      { source: '/gallery', destination: '/pages/gallery' },
    ];
  },

};

export default nextConfig;
