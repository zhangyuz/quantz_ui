module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    apollo : {
      lintGQL : true
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
