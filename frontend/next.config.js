/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const globImporter = require('node-sass-glob-importer');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,

  sassOptions: {
    sourceMap: true,
    importer: globImporter(),
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ar'],
  },
  async rewrites() {
    return [
      {
        source: '/:locale(en|ar)/:path*',
        destination: '/:path*',
      },
    ];
  },
});
