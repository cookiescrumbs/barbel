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
                },
                {
                    test: /\.jsx?$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'eslint-loader',
                    }]
                }],
            },
            externals: {
                'react/addons': true,
                'react/lib/ReactContext': true,
                'react/lib/ExecutionEnvironment': true
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