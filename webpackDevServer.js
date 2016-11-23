const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const HOST = 'localhost'
const PORT = 3000
new WebpackDevServer(webpack(config), {
  contentBase: config.output.contentBase,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  host: HOST,
  stats: {
    colors: true
  }
}).listen(PORT, HOST, (err, result) => {
  console.log( err ? err : `Listening at http://${HOST}:${PORT}/` )
})
