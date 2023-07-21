// webpack.config.js

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
plugins: [
    new CleanWebpackPlugin(),
    ],
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
    },
  },
};
