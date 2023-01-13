/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["api.dicebear.com"],
  },
};

module.exports = nextConfig;
