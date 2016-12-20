const path = require('path');

const glob = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const pathResolve = (p) => path.resolve(__dirname, p);

const entries = getEntries('./pages/*.js');

module.exports = {
  entry: entries,
  output: {
    path: pathResolve('./dist'),
    filename: '[name].js'
  },
  plugins: [
    ...Object.keys(entries).map((entry) => new HTMLWebpackPlugin({
      filename: `${entry}.html`,
      template: `templates/${entry}.html`,
      inject: true,
      chunks: [entry]
    }))
  ]
};

function getEntries(pathGlob) {
  const files = glob.sync(pathGlob);

  return files.reduce((acc, file) => {
    const extname = path.extname(file);
    const basename = path.basename(file, extname);

    acc[basename] = `./${file}`;

    return acc;
  }, {});
}
