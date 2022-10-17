module.exports = {
  devServer: {
    // 配置代理
    proxy: {
      //代理接口前缀为/api的请求
      '/api': {
        target: 'http://localhost:8443', //需要代理到的目标地址
        changOrigin: true, //是否跨域
        pathRewrite: {
          '^/api': '' //重写路径
        }
      }
    }
  },
  lintOnSave: false,
};
