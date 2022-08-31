const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.ts",
  },
  devServer: { port: "3000", static: "./dist" },
  mode: "development",
  devtool: "eval",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
};
