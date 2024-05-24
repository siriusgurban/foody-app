// const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */

// import s from './next-i18next.configS';
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@mui/x-charts"],
  i18n: {
    locales: ["en", "az", "de"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gujarat.mallsmarket.com",
        port: "",
        pathname: "/sites/default/files/styles/medium/public/images/brands/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        port: "",
        pathname: "/media/photo-p/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "hips.hearstapps.com",

        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",

        hostname: " media-cdn.tripadvisor.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",

        hostname: "s3-media0.fl.yelpcdn.com",

        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
