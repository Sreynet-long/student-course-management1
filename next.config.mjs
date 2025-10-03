// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // CRITICAL: Ensure BOTH Apollo packages are listed here for transpile stability
  transpilePackages: ['@apollo/client', '@apollo/experimental-nextjs-app-support'],
};

export default nextConfig;