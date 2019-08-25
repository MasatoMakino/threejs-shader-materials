const path = require("path");
const glob = require("glob");

const srcDir = "./demoSrc";

const entries = {};
glob
  .sync("**/demo*.js", {
    cwd: srcDir
  })
  .map(key => {
    entries[key] = path.resolve(srcDir, key);
  });

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, "docs/demo"),
    filename: "[name]",
    chunkFilename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: "vendor",
          test: /node_modules/,
          enforce: true
        }
      }
    }
  }
};
