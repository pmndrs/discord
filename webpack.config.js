const fs = require('fs')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
    path: path.join(__dirname, '.webpack'),
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
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: 'package.json' }],
    }),
  ],
}
