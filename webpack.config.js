const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")
const StatsPlugin = require("stats-webpack-plugin")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin

module.exports = {
  entry: "./src/censored-style.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "censored-style.js"
  },
  devServer: {
    index: "index.html",
    contentBase: ["./src", "./public"],
    watchContentBase: true,
    open: true,
    inline: true,
    hot: true
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, "src/index.html"),
      minify: {
        collapseWhitespace: false,
        preserveLineBreaks: true
      }
    }),
    new StatsPlugin("stats.json", {
      chunkModules: true
    }),
    new BundleAnalyzerPlugin()
  ]
}
