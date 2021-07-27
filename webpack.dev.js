const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
const StatsPlugin = require("stats-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = env => {
  return merge(common, {
    mode: "development",
    devServer: {
      index: "index.html",
      contentBase: ["./src", "./public"],
      watchContentBase: true,
      open: true,
      inline: true,
      hot: true
    },
    plugins: env.ANALYZE != null
      ? [
          new StatsPlugin("stats.json", {
            chunkModules: true
          }),
          new BundleAnalyzerPlugin()]
      : []
  })
}
