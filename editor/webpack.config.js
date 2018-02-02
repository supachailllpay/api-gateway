const path = require('path')

module.exports = {
  entry: './src/main.js',

  output: {
    path: path.resolve('../app/public'),
    filename: 'index.js',
    publicPath: '/'
  },

  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          'scss': 'vue-style-loader!css-loader!sass-loader'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    },
    extensions: ['.js', '.vue', '.json']
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      '/data': 'http://localhost:3000'
    }
  }
}

const CopyWebpackPlugin = require('copy-webpack-plugin')

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
    new CopyWebpackPlugin([{
      from: 'index.html', to: '../views'
    }])
  ]
}
