var path = require('path')

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        // TODO(stephenmathieson): remove this and add a .babelrc
        query: {
          presets: [ 'es2015', 'stage-0' ],
          plugins: [
            [ 'transform-react-jsx', { pragma: 'element' } ],
            [ 'babel-plugin-webpack-alias' ]
          ]
        }
      }
    ]
  }
}
