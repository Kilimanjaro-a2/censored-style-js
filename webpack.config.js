const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./src/under-censorship.ts",
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
    filename: "under-censorship.js"
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
    })
  ]
}
