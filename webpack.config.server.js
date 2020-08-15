const fs = require('fs')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const NodemonPlugin = require('nodemon-webpack-plugin')

var nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: './src/app.ts',
  target: 'node',
  externals: nodeModules,
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.json', '.ts'],
  },
  output: {
    path: path.join(__dirname, '.webpack.server'),
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  plugins: [new Dotenv({ path: '.env' }), new NodemonPlugin()],
}
