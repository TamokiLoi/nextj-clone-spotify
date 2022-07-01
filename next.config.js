/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  optimizeFonts: false,
  images: {
    domains: ["links.papareact.com", "avatars.dicebear.com"],
  },
};

module.exports = nextConfig;