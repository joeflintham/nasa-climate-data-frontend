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
                test: path.join(__dirname, 'lib'),
                query: {
                    presets: 'es2015',
                },
            }
        ]
    }
};
