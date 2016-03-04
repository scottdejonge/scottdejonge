var path = require('path');
var webpack = require('webpack');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var postcssImport = require('postcss-import');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/css'),
        loader: ExtractTextPlugin.extract('css-loader!postcss-loader'),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?/,
        loader: 'url?limit=8000&name=[name].[ext]'
      }
    ]
  },
  postcss: function(webpack) {
    return [
      autoprefixer({
        browsers: ['last 2 versions']
      }),
      postcssImport({
        path: './src/css/*.css',
        addDependencyTo: webpack
      }),
      precss
    ];
  }
};