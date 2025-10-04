import type { NextConfig } from "next";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Ensure Next.js uses the project root instead of an inferred parent directory
  outputFileTracingRoot: resolve(__dirname),
  // Disable ESLint during builds and production
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
