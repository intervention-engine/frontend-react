var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',

  entry: [
    'bootstrap-loader',
    'font-awesome-sass-loader',
    path.join(__dirname, "app", "index.js")
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "app", "index.tmpl.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    colors: true,
    historyApiFallback: true,
    inline: true
  }
};
