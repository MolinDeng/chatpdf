/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack, nextRuntime }
  ) => {
    config.externals.push({
      '@aws-sdk/signature-v4-multi-region':
        'commonjs @aws-sdk/signature-v4-multi-region',
    });
    if (isServer && nextRuntime === 'nodejs')
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );

    return config;
  },
};

module.exports = nextConfig;
