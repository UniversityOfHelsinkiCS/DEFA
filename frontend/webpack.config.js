const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const htmlTemplate = require('html-webpack-template')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const dotenv = require('dotenv')

module.exports = (env, argv) => {
 const { mode } = argv
  const additionalPlugins = mode === 'production' ? [new UglifyJsPlugin()] : [] // Make JS smaller
  env = dotenv.config().parsed
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})
  const additionalOptimizations = mode === 'production' ? {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      // Make CSS smaller
      new OptimizeCssAssetsPlugin()
    ]
  } : {}

  return {
    entry: [
      '@babel/polyfill', // babel-polyfill so we don't need to import it anywhere
      './src'
    ],
    module: {
      rules: [
        { // Load JS files
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        { // Load CSS files
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
        },
        { // Load other files
          test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
          use: ['file-loader']
        }
      ]
    },
    optimization: {
      ...additionalOptimizations
    },
    plugins: [
      // Skip the part where we would make a html template
      new HtmlWebpackPlugin({
        inject: false,
        template: htmlTemplate,
        appMountId: 'root'
      }),
      // Extract css
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[name]-[id].css'
      }),
      new webpack.DefinePlugin(envKeys),
      ...additionalPlugins
    ],
    devServer: {
      proxy: {
        '/api': 'http://localhost:3000'
      },
      historyApiFallback: true
    }
  }
}
