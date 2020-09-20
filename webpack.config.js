const fs = require('fs')
const path = require('path')
const Dotenv = require('dotenv-webpack')
const NodemonPlugin = require('nodemon-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const chalk = require('chalk')

const IS_DEV = process.env.NODE_ENV !== 'production'

const ROOT_PATH = __dirname
const PATHS = {
  ROOT: ROOT_PATH,
  SRC: `${ROOT_PATH}/src`,
  OUT: `${ROOT_PATH}/${IS_DEV ? '.webpack.dev' : '.webpack'}`,
}

const nodeExternals = () =>
  fs.readdirSync('node_modules').reduce((acc, mod) => {
    if (['.bin'].indexOf(mod) !== -1) return acc
    acc[mod] = 'commonjs ' + mod
    return acc
  }, {})

module.exports = {
  context: PATHS.ROOT,
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : undefined,
  entry: `${PATHS.SRC}/app.ts`,
  target: 'node',
  externals: nodeExternals(),
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.json', '.ts'],
  },
  output: {
    path: PATHS.OUT,
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-env', '@babel/preset-typescript'].filter(Boolean),
          plugins: ['@babel/plugin-proposal-class-properties'].filter(Boolean),
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    IS_DEV && new NodemonPlugin({ verbose: false, quiet: true }),
    IS_DEV && new Dotenv({ path: `${PATHS.ROOT}/${process.env.PRODLIKE ? '.env' : '.env.dev'}` }),
    IS_DEV && {
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('Compilation Message', () => {
          console.log(`${chalk.blueBright('[discord-bot]')} compilation complete`)
        })
      },
    },
  ].filter(Boolean),
}
