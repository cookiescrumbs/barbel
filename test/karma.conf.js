var path = require('path');

module.exports = function(config) {
    config.set({
        basePath: '../../',
        frameworks: ['jasmine'],
        files: [
            require.resolve('phantomjs-polyfill/bind-polyfill'),
            require.resolve('requirejs/require'),
            'test/unit/*-spec.js'
        ],
        preprocessors: {
            'test/unit/*-spec.js': ['webpack', 'sourcemap']
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
                loaders: [
                    {
                        test: /\.jsx?$/,
                        loader: 'babel',
                        exclude: /(node_modules|bower_components)/
                    }
                ]
            },
            resolve: {
                extensions: ['', '.js', '.jsx'],
                root: path.resolve(__dirname)
            },
            externals: {
                'cheerio': 'window',
                'sinon': true,
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
                'morph-static-prefix': 'function() { return "static/prefix/mock"; }',
                'bbc-morph-grandstand': 'function() { return ""}; '
            }
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