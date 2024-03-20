/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

// const nextConfig = {
//   trailingSlash: true,
//   output: "export",
//   reactStrictMode: true,
//   experimental: { appDir: true },
// };

// const withTM = require("next-transpile-modules")([]);

// module.exports = withTM(nextConfig);
