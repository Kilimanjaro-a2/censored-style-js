const path = require("path")
const HTMLPlugin = require("html-webpack-plugin")

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
