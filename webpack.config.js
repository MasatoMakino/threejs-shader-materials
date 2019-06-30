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
    filename: "[name]"
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
  }
};
