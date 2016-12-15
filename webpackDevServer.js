const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const host = config.devServer.host
const port = config.devServer.port
new WebpackDevServer(webpack(config), {
  contentBase: config.output.contentBase,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  host: host,
  stats: {
    colors: true
  }
}).listen(port, host, (err, result) => {
  console.log(err ? err : `Listening on ${host}:${port}/` )
})
