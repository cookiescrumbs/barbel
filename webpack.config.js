var path = require('path');

var config = {
    entry: path.resolve(__dirname, './src/index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, '/docs/lib'),
        filename: 'barbel.min.js',
        library: 'Barbel',
        libraryTarget: 'umd'
    },
    externals: [
        {
            react: 'React',
            'styled-components': 'styled'
        }],
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.jsx?$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'eslint-loader',
            }]
        }]
    },
    resolve: {
        extensions: ['.jsx', '.js'],
        modules: [
            path.resolve(__dirname, './src')
        ]
    },
    plugins: []
};

module.exports = config;
