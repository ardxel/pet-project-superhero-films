const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = function (env, argv) {
  const configFromCommon = common(env, argv);

  const result = {
    devtool: 'cheap-module-source-map',
  };

  return merge([configFromCommon, result]);
};
