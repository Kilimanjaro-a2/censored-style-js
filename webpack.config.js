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
    filename: "under-censorship.js",
    path: path.resolve(__dirname, "dist")
  }
}
