/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
  transpilePackages: ["@react-pdf/renderer"],
};

export default nextConfig;
