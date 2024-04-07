const runtimeCaching = require("next-pwa/cache");
const withPWA = require('next-pwa');
const { hostname } = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [hostname] // Using hostname directly instead of template string
  },
};

const pwa = process.env.NEXT_PWA_STATUS === '1'; // Checking if PWA is enabled

// Wrapping the nextConfig with PWA configuration only if PWA is enabled
const nextConfigWithPwa = pwa ? withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    runtimeCaching,
  },
}) (nextConfig) : nextConfig;

module.exports = nextConfigWithPwa;
