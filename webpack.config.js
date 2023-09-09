const path = require('path');

module.exports = {
  entry: './follow-my-cursor.js',
  output: {
    filename: 'follow-my-cursor.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'followMyCursor',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
