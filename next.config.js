const path = require('path');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withVideos = require('next-videos');

module.exports = withVideos(
  withImages(
    withCSS(
      withSass({
        target: 'serverless',
        devIndicators: {
          autoPrerender: false,
        },
        env: {
          CLIENT_ID: process.env.CLIENT_ID,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
          REDIRECT_URI: process.env.REDIRECT_URI,
        },
        webpack(config, options) {
          config.resolve.alias['src'] = path.join(__dirname, 'src');
          config.resolve.extensions.push('.js', '.tsx', '.ts');
          config.node = {
            // Some libraries import Node modules but don't use them in the browser.
            // Tell Webpack to provide empty mocks for them so importing them works.
            ...config.node,
            fs: 'empty',
            child_process : 'empty',
            net : 'empty',
            tls: 'empty',
          };
          return config;
        },
        images: {
          domains: ['firebasestorage.googleapis.com'],
        },
      }),
    ),
  ),
);
