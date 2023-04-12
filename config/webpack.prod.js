const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = function (env, argv) {
  const configFromCommon = common(env, argv);
  const result = {
    mode: 'production',
    output: {
      filename: '[name].[hash:8].js',
    },
    devtool: 'inline-source-map',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: true,
          parallel: true,
        }),
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
              },
            ],
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
        minChunks: 3,
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        automaticNameDelimiter: '~',
        cacheGroups: {
          react: {
            test(module) {
              // `module.resource` contains the absolute path of the file on disk.
              return (
                module.resource &&
                module.resource.includes('node_modules/react')
              );
            },
            chunks: 'initial',
            filename: 'react.[contenthash].js',
            priority: 1,
            maxInitialRequests: 2,
            minChunks: 1,
          },
        },
      },
      runtimeChunk: {
        name: 'runtime',
      },
    },
  };

  return merge([configFromCommon, result]);
};
