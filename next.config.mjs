// const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */

// import s from './next-i18next.configS';
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@mui/x-charts'],
  i18n: {
    locales: ['en', 'az', 'de'],
    defaultLocale: 'en',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gujarat.mallsmarket.com',
        port: '',
        pathname: '/sites/default/files/styles/medium/public/images/brands/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/v0/b/foody-app-f27a2.appspot.com/o/**',
      },
      // {
      //   protocol: '',
      //   hostname: 'C:\fakepath',
      //   port: '',
      //   pathname: '\**',
      // },
    ],
  },
};

export default nextConfig;

