const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');

const path_main = path.resolve(__dirname, '../');
const path_src = path.resolve(__dirname, '../src/');
const path_build = path.resolve(__dirname, '../build/');

module.exports = function (env, argv) {
  const isDevServer = env.WEBPACK_SERVE;
  const mode = argv.mode || (isDevServer ? 'development' : 'production');
  const isDevMode = mode !== 'production';
  process.env.NODE_ENV = mode;
  console.log(mode);

  /** @type {import('webpack').Configuration} */

  return {
    entry: path.resolve(path_src, 'index.tsx'),
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      path: path_build,
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', 'json', 'svg'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(path_main, 'tsconfig.json'),
        }),
      ],
    },

    module: {
      rules: [
        // rule for js, jsx files
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        // rule for ts, tsx files
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
            // 'eslint-loader'
          ],
        },
        // rule for style files
        {
          test: /\.css$|\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: /\.module\.\w+$/,
                  localIdentName: '[local]__[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.resolve(path_main, 'postcss.config.js'),
                  values: true,
                },
              },
            },
            'sass-loader',
          ],
        },
        // rule for other files
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
        // rule for svg
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        // rule for fonts
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          exclude: /node_modules/,
          type: 'asset',
          generator: {
            filename: 'fonts/[hash][ext][query]',
          },
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(path_src, 'index.html'),
        filename: 'index.html',
        minify: isDevMode
          ? false
          : {
              collapseWhitespace: true,
              removeComments: true,
            },
      }),
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: isDevMode
          ? 'css/[name].css'
          : 'css/[name].[contenthash:8].css',
      }),
      new ESLintPlugin(),
      // new BundleAnalyzerPlugin({
      //   generateStatsFile: false,
      //   openAnalyzer: false,
      // })
    ],
  };
};
