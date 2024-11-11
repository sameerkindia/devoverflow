/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: true,
  experimental: {
    serverActions: true,
  },
  mdxRs: true,
  serverComponentsExternalPackages: ["mongooes"],
};

module.exports = nextConfig;
