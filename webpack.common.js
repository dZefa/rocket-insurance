const webpack = require('webpack');
const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractCSSPlugin = require('mini-css-extract-plugin');

const APP_DIR = path.resolve(__dirname, './src/index.tsx');
const BUILD_DIR = path.resolve(__dirname, './build');
const TEMPLATE_DIR = path.resolve(__dirname, './src/template.index.html');

module.exports = {
  entry: {
    app: APP_DIR,
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-syntax-dynamic-import', '@babel/plugin-transform-modules-commonjs'],
            },
          },
          {
            loader: 'ts-loader',
          }
        ]
      },
      {
        test: /.css$/,
        use: [
          ExtractCSSPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractCSSPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new HTMLPlugin({
      template: TEMPLATE_DIR,
      inject: true
    })
  ]
};
