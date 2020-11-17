"use strict";

const path = require("path");
const webpack = require("webpack");

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    index: './src/index'
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
  watch: true,
  watchOptions: {
    aggregateTimeout: 100
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js'
  },

  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};