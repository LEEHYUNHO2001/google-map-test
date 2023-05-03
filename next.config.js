/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'akamai',
    path: '/',
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://api.themoviedb.org/3/:path*`,
      },
    ];
  },
};
module.exports = nextConfig;
