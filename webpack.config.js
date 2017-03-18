var webpack = require('webpack');
var path = require('path');

var config = {
    entry: path.resolve(__dirname, './src/index.js'),
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname + '/lib'),
        filename: 'barbel.min.js',
        library: 'Barbel',
        libraryTarget: 'umd'
    },
    externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      }
    }],
    module: {
        rules: [{
            test:/\.jsx?$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader'
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