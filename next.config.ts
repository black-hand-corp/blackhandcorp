/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['d1yei2z3i6k35z.cloudfront.net'], // Add your domain here
    unoptimized: true, // Disable Next.js image optimization
    formats: ['image/avif', 'image/webp'], // Enable AVIF and WebP formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1yei2z3i6k35z.cloudfront.net',
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
