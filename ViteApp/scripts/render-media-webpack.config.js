const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: ["./scripts/render-media.script.js"],
  output: {
    path: path.resolve(__dirname, "../build/scripts"),
    filename: "render-media.script.js",
    libraryTarget: "commonjs"
  },
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: { node: "16" },
                  useBuiltIns: "usage",
                  corejs: 3
                }
              ]
            ],
            plugins: []
          }
        }
      },
      {
        test: /.node$/,
        use: "node-loader"
      }
    ]
  },
  plugins: [],
  node: false,
};
