const webpack = require("webpack")
const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require("autoprefixer")

module.exports = function (env) {
  const debug = env !== 'prod'

  return {
    entry: debug ? [
      "react-hot-loader/patch",
      "./src/index.js"
    ] : [
      "./src/index.js"
    ],

    output: {
      path: path.join(__dirname, "public/static"),
      filename: "bundle.js",
      publicPath: "/static/"
    },

    devtool: "source-map",

    module: {
      rules: [

        {
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: "pre",
          loader: "eslint-loader",
        },

        {
          test: /\.js?$/,
          use: "babel-loader",
          include: path.join(__dirname, "src")
        },

        {
          test: /\.(woff(2)?|png|jpg|gif|svg)(\?[a-z0-9=\.]+)?$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: '100000',
              }
            }
          ],
          include: path.join(__dirname, "src")
        },


        {
          test: /\.(ttf|eot|webm|mp4)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        },

        {
          test: /\.css$/,
          use: (debug)
            ? [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: "[path][name]__[local]--[hash:base64:5]"
                }
              },
              "postcss-loader",
            ]
            : ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                  {
                    loader: "css-loader",
                    options: {
                      modules: true,
                      importLoaders: 1,
                      localIdentName: "[path][name]__[local]___[hash:base64:5]"
                    }
                  },
                  "postcss-loader",
                ],
              })
        }
      ],
    },


    devServer: {
      hot: true,
      historyApiFallback: true,
      host: "0.0.0.0",
      port: "3000",
      contentBase: path.join(__dirname, "public"),
      publicPath: "/static/",
      stats: { colors: true },
      inline: true,
    },

    resolve: {
      modules: [
        path.join(__dirname, "src"),
        "node_modules",
      ]
    },

    plugins: debug
      ? [
        new webpack.HotModuleReplacementPlugin(),
      ]
      : [
        new ExtractTextPlugin({
          filename: "style.css"
        }),
        new webpack.DefinePlugin({
          "process.env":{
            "NODE_ENV": JSON.stringify("production")
          }
        }),
        new webpack.optimize.UglifyJsPlugin({
          mangle: false,
          sourceMap: false,
          compress: {
            warnings: true
          }
        }),
      ]

  }
}
