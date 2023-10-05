/** @type {import('next').NextConfig} */
// const nextConfig = {};
const nextConfig = {
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, webpack, nextRuntime }
  ) => {
    // config.externals.push({
    //   '@aws-sdk/signature-v4-multi-region':
    //     'commonjs @aws-sdk/signature-v4-multi-region',
    // });
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve.fallback,
          fs: false,
        },
      };
    }
    if (isServer && nextRuntime === 'nodejs') {
      config.plugins.push(
        new webpack.IgnorePlugin({ resourceRegExp: /^aws-crt$/ })
      );
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
};

module.exports = nextConfig;
