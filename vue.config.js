const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath:'./',
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    port: 8888,  
    /* proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn/'
      }
    } */
  }
})
