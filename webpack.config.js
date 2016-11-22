var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer');



module.exports = {
  entry: debug ? [
    'babel-polyfill',
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/index.js'
  ] : [
    'babel-polyfill',
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'public/static'),
    filename: 'bundle.js',
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/static/'
  },

  devtool: 'source-map',

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
      }
    ],
    loaders: [
      {
        test: /\.js?$/,
        loaders: debug ? ['react-hot','babel']:['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(woff(2)?|png|jpg|gif)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader',
        query: {
          limit: '10000'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        loaders: (debug ? x=>x : x=>ExtractTextPlugin.extract.apply(x))([
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
            'postcss-loader'
          ]
        )
      }
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],


  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules'],
    root: path.resolve('./src')
  },

  plugins: debug
    ? [
      new webpack.HotModuleReplacementPlugin(),
    ]
    : [
      new ExtractTextPlugin('style.css'),
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false, compress: {warnings: true }})
    ]

}
