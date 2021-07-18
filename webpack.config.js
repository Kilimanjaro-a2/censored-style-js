const path = require("path")

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
    filename: "main.js"
  },
  devServer: {
    index: "index.html",
    contentBase: ["./src", "./public"],
    open: true,
    inline: true,
    hot: true
  }
}
