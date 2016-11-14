module.exports = function (config) {
    config.set({
        basePath: './',
        files: [
            'www/Content/Js/Apps/**/*.js',
            'test/spec/**/*.js',
            'test_out/*.js'
        ],
        // list of files to exclude
        exclude: [
            'www/Content/Js/Apps/main.js',
            'www/Content/Js/Apps/app.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    }
    );
};
