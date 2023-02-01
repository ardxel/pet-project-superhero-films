// const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  plugins: () => {
    return [
      require('postcss-preset-env')(),
      require('autoprefixer')({
        grid: true,
        flexbox: true
      })
    ]
  }
}