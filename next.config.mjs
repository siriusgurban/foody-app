// const { i18n } = require('./next-i18next.config')
/** @type {import('next').NextConfig} */

// import s from './next-i18next.configS';
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'az', 'de'],
    defaultLocale: 'en',
  },
  transpilePackages: ['@mui/x-charts']
};

export default nextConfig;

