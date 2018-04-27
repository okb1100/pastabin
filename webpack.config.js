const path = require('path');
const webpack = require('webpack');
// TODO: Fix this.

const hljsLanguages = require('./src/pastabinConfig').languagesSupported;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(path.resolve(__dirname, 'public'), 'js'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /highlight\.js\/lib\/languages$/,
      new RegExp(`^./(${hljsLanguages.join('|')})$`),
    ),
  ],
  mode: 'none',
};
