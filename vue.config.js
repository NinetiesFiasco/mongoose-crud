module.exports = {
  devServer: {
    port: process.env.VUE_APP_DEVELOPMENT_SERVER_PORT,
    proxy: `http://localhost:${process.env.VUE_APP_SERVER_PORT}`
  }
}
