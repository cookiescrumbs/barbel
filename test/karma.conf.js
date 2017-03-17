var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],
        files: [
            require.resolve('phantomjs-polyfill/bind-polyfill'),
            'test/**/*-spec.js'
        ],
        preprocessors: {
            'test/**/*-spec.js': ['webpack', 'sourcemap']
        },
        plugins: [
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-phantomjs-launcher'
        ],
        webpack: {
            module: {
                rules: [{
                    test: /\.jsx?$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'babel-loader'
                    }]
                }]
            },
            externals: {}
        },
        logLevel: config.LOG_INFO,
        webpackServer: {
            stats: {
                colors: true
            }
        },
        reporters: ['spec'],
        port: 9876,
        colors: true,
        browsers: ['PhantomJS'],
        captureTimeout: 60000,
        singleRun: true
    });
};