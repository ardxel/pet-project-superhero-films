const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = function (env, argv) {
	const configFromCommon = common(env, argv)
	const result = {
		mode: 'production',
		output: {
			filename: '[name].[contenthash].js',
		},
		optimization: {
			minimizer: [new TerserPlugin({})],
		},
	}

	return merge([configFromCommon, result])
}
