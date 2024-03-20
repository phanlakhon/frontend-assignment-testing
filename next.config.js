/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
