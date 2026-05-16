/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // basePath: '/flatorte.github.io', // Décommente si besoin de basePath
  trailingSlash: true,
  images: {
    unoptimized: true, // requis pour static export
  },
  // Disable server features
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
