const path = require('path')
const webpack = require('webpack')
const AssetsPlugin = require('assets-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
const port = 8080
const host = 'http://localhost'

// const sassLoadersDefault = [
//   'style-loader',
//   'css-loader?sourceMap',
//   'postcss-loader',
//   'sass-loader?sourceMap'
// ]

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: [
      './client.js'
    ]
  },
  output: {
    filename: NODE_ENV === 'development'
      ? 'js/[name].bundle.js'
      : 'js/[name].[hash].bundle.js',
    path: path.resolve(__dirname, './build/public'),
    publicPath: NODE_ENV === 'development'
      ? host + ':' + port + '/static/'
      : '/static/'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
        exclude: /(node_modules)/
      },
      {
        test: /\.(json)$/,
        use: ['json-loader']
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          loader: [
            {
              loader: 'css-loader',
              query: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              query: {
                sourceMap: true
              }
            }
          ],
          fallbackLoader: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    new AssetsPlugin({
      path: path.resolve(__dirname, './build'),
      prettyPrint: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV)
      }
    }),
    new ExtractTextPlugin(NODE_ENV === 'development'
      ? 'styles/bundle.css'
      : 'styles/[contentHash].bundle.css')
  ],
  resolve: {
    extensions: [
      '.js', '.json'
    ],
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules'
    ],
    alias: {
      react: path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    }
  },
  devtool: NODE_ENV === 'development'
    ? 'eval-source-map'
    : 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './build/public'),
    stats: 'errors-only',
    publicPath: '/static/',
    port: port
  }
}
