// const webpack = require('webpack');
const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, '..', './src/client/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].bundle.js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(),
    // new CopyPlugin({
    //   patterns: [{from: './src/client', to: 'dist'}]
    // }),
    new HtmlWebpackPlugin({
      template: './src/client/index.html',
      // favicon: './public/favicon.ico',
    }),
  ],
};
