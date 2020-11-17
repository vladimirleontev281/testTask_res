"use strict";

const path = require("path");
const webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    index: './src/js/index'
  },
  mode: NODE_ENV == 'development' ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          /* option is in babel.rc */
        },
      },
    ]
  },

  resolve: { extensions: ["*", ".js", ".jsx"] },
  
  devtool: NODE_ENV == 'development' ? "eval" : null,
  watch: false,

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
  ],
};