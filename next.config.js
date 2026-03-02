/** @type {import('next').NextConfig} */
const nextConfig = {
  /** Единый формат URL — без trailing slash. /afisha/ → редирект на /afisha */
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.teatr-krug-spb.ru",
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", pathname: "/uploads/**" },
      { protocol: "http", hostname: "127.0.0.1", pathname: "/uploads/**" },
    ],
  },
};

module.exports = nextConfig;
