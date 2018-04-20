const path = require('path')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')
const ManifestPlugin = require('webpack-manifest-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

dotenv.config()

const isDev = process.env.NODE_ENV === 'development'

const app_env_variables = Object
  .keys(process.env)
  .filter(key => {
    return key.indexOf('APP_') === 0
  })
  .reduce((acc, key) => {
    acc[key] = process.env[key]
    return acc
  }, {})

app_env_variables.NODE_ENV = process.env.NODE_ENV
app_env_variables.DEBUG = process.env.DEBUG

const extractSass = new ExtractTextPlugin({
    filename: isDev
      ? 'main.css'
      : '[name].[contenthash].css',
    disable: isDev
});

var browserConfig = {
  entry:'./src/client.js',
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: isDev
      ? 'bundle.js'
      : '[name].[chunkhash].js',
    publicPath: '/static/assets/'
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ]
  },
  devtool: isDev
    ? 'cheap-module-source-map'
    : 'source-map',
  stats: isDev
    ? 'errors-only'
    : 'minimal',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                minimize: !isDev
              }
            },
            {
              loader: "postcss-loader",
              options: { sourceMap: true }
            },
            {
              loader: "sass-loader",
              options: { sourceMap: true }
            }
          ],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: isDev
    ? [
        new ManifestPlugin({
          fileName: 'webpack-client-assets.json',
          writeToFileEmit: true,
        }),
        extractSass,
        new webpack.EnvironmentPlugin(app_env_variables),
        new webpack.NamedModulesPlugin(),
      ]
    : [
        new CleanWebpackPlugin(['public/assets']),
        new ManifestPlugin({
          fileName: 'webpack-client-assets.json'
        }),
        extractSass,
        new webpack.EnvironmentPlugin(app_env_variables),
        new UglifyJsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      ]
}

var serverConfig = {
  entry: './src/index.js',
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    __filename: false,
    __dirname: false,
    Buffer: false,
    setImmediate: false
  },
  externals: [
    nodeExternals()
  ],
  output: {
    path: __dirname,
    filename: 'index.js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src"),
    ]
  },
  devtool: isDev
    ? 'cheap-module-source-map'
    : 'source-map',
  stats: isDev
    ? 'errors-only'
    : 'minimal',
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: isDev
    ? [
        new webpack.EnvironmentPlugin(app_env_variables),
        new webpack.NamedModulesPlugin(),
      ]
    : [
        new webpack.EnvironmentPlugin(app_env_variables),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
      ]
}

module.exports = [browserConfig, serverConfig]
