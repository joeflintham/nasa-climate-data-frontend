var path = require('path');
module.exports = {
  entry: './lib/main.js',
  output: {
    path: path.join(__dirname, 'app/scripts/lib'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, "bower_components")
        ],
        test: path.join(__dirname, 'lib'),
        query: {
          presets: 'es2015',
        }
      },
      {
        loader: 'inject-loader',
        test: path.join(__dirname, 'lib')
      }
    ]
  }
};
