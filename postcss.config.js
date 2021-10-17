module.exports = {
    plugins: [
      require('postcss-nesting')
      ,
      require('postcss-import')({
        path: ["css"]
      }),
      require('autoprefixer')(),
    ],
  }