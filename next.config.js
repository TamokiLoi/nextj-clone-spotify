/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  optimizeFonts: false,
  images: {
    domains: ["links.papareact.com", "avatars.dicebear.com", "i.scdn.co", "mosaic.scdn.co"],
  },
};

module.exports = nextConfig;