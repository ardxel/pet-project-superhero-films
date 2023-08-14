const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcss_import = require('postcss-import');
module.exports = {
  plugins: [postcss_import({}), autoprefixer({}), tailwindcss],
};
