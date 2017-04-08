module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-babel');
    grunt.initConfig({
        babel: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './src',
                    src: '**/*.js{,x}',
                    ext: '.js',
                    dest: './lib'
                }]
            },
            options: { sourceMap: true }
        },
        eslint: {
            target: [
                './src/**/*.js',
                './src/**/*.jsx',
                './test/**/*.js'
            ]
        }
    });
    grunt.registerTask('build', [
        'babel',
        'eslint'
    ]);
};
