/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable font optimization to avoid build timeouts/errors with Google Fonts
  optimizeFonts: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;
