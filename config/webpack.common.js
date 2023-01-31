const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

const src = path.resolve(__dirname, '../src/')
const build = path.resolve(__dirname, '../build/')

module.exports = function (env, argv) {
	const isDevServer = env.WEBPACK_SERVE
	const mode = argv.mode || (isDevServer ? 'development' : 'production')
	const isDevMode = mode !== 'production'
	process.env.NODE_ENV = mode
	console.log(mode)

	return {
		entry: path.resolve(src, 'index.tsx'),
		output: {
			filename: '[name].bundle.js',
			path: build,
			clean: true,
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', 'json', 'svg', 'png', 'jpeg'],
		},
		// alias: {},
		module: {
			rules: [
				// rule for js, jsx files
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: ['@babel/preset-env', '@babel/preset-react'],
							},
						},
						// 'eslint-loader'
					],
				},
				// rule for ts, tsx files
				{
					test: /\.(ts|tsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								presets: [
									'@babel/preset-env',
									'@babel/preset-typescript',
									'@babel/preset-react',
								],
							},
						},
						// 'eslint-loader'
					],
				},
				// rule for style files
				{
					test: /\.css$|\.scss$/,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
				// rule for other files
				{
					test: /\.(png|jpg|svg|gif)$/,
					use: ['file-loader'],
				},
				// rule for fonts
				{
					test: /\.(ttf|woff|woff2|eot)$/,
					use: ['file-loader'],
				},
			],
		},

		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: path.resolve(src, 'index.html'),
				filename: 'index.html',
				minify: isDevMode
					? false
					: {
							collapseWhitespace: true,
							removeComments: true,
					  },
			}),
			new MiniCssExtractPlugin({
				filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
			}),
			new ESLintPlugin(),
		],
	}
}
