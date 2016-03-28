var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  //entry: "./js/scripts.js",
  entry: {
    scripts: './js/scripts.js',
    styles: './css/styles.js'
  },
  output: {
    path: __dirname + "/js",
    filename: "scripts.min.js"
  },
  plugins: debug ? [
    new ExtractTextPlugin('../css/[name].css')
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    // new ExtractTextPlugin('../css/[name].css')
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loader: 'style-loader!css-loader!postcss!sass-loader' },
      { test: /\.css$/ , loader: "style-loader!css-loader" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
    ]
  },
  postcss: function () {
    return [autoprefixer];
  },
};

// https://gist.github.com/learncodeacademy/25092d8f1daf5e4a6fd3
