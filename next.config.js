const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://default-api-url.com';

const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`
      },
      {
        source: '/uploads/:path*',
        destination: `${apiUrl}/uploads/:path*`
      }
    ]
  },
  images: {
    unoptimized: true,
    domains: ["127.0.0.1", '154.49.136.99', 'localhost', 'www.api.opklinika', "opklinika", "api.opklinika"]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader']
    });

    return config;
  }
}

module.exports = nextConfig;
