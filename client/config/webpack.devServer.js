const dev = require('./webpack.dev');
const { merge } = require('webpack-merge');

module.exports = function (env, argv) {
  const isDevServer = env.WEBPACK_SERVE;
  const mode = argv.mode || (isDevServer ? 'development' : 'production');
  const isDevMode = mode !== 'production';

  const configDev = dev(env, argv);
  const serveConfig = {
    devServer: {
      hot: isDevMode,
      port: 3000,
      historyApiFallback: true,
    },
  };

  return merge([configDev, serveConfig]);
};
