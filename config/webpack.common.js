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

  return {
    entry: path.resolve(path_src, 'index.tsx'),
    output: {
      filename: '[name].js',
      path: path_build,
      publicPath: '/',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', 'json', 'svg', 'png', 'jpeg'],
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
          test: /\.(png|jpg|svg|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'images/[name]-[hash].[ext]',
            },
          },
        },
        // rule for fonts
        {
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(path_src, 'index.html'),
        filename: 'index.html',
        minify: !isDevMode && {
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[contenthash].css',
      }),
      new ESLintPlugin(),
    ],
  };
};
