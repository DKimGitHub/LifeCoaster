/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    esmExternals: 'loose',
  },
  images: {
    domains: ["api.dicebear.com"],
  },
};

module.exports = nextConfig;
