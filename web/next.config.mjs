/** @type {import('next').NextConfig} */
const nextConfig = {
  // 32-bit Node has a ~2GB heap ceiling; disable webpack's filesystem cache in dev to avoid
  // "Array buffer allocation failed" from the pack-file cache strategy.
  webpack(config, { dev }) {
    if (dev) config.cache = false;
    return config;
  },
};

export default nextConfig;
