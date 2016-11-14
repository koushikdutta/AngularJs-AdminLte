/* Build Script */
module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    var pkgVersion = '1.0.0';
    // Project configuration.
    grunt.initConfig({
        bowercopy: {
            options: {
                srcPrefix: 'bower_components',
                clean: false
            },
            jsLibs: {
                options: {
                    destPrefix: 'src/Content/Js/Libs'
                },
                files: {
                    'RequireJs/require.js': 'requirejs/require.js',
                    'AdminLTE/adminlte.min.js': 'admin-lte/dist/js/app.min.js',
                    'AdminLTE/plugins': 'admin-lte/plugins',
                    'Bootstrap/bootstrap.min.js': 'admin-lte/bootstrap/js/bootstrap.min.js',
                    'JointJsBundle/jointjs': 'jointjs/dist',
                    'JointJsBundle/backbone': 'backbone',
                    'JointJsBundle/lodash': 'lodash',
                    'Jquery/jquery.min.js': 'jquery/dist/jquery.min.js',
                    'Jquery/jquery-ui': 'jquery-ui',
                    'Angular/angular.min.js': 'angular/angular.min.js',
                    'Angular/components/angular-bootstrap': 'angular-bootstrap',
                    'Angular/components/angular-dialog-service': 'angular-dialog-service/dist',
                    'Angular/components/angular-local-storage/angular-local-storage.min.js': 'angular-local-storage/dist/angular-local-storage.min.js',
                    'Angular/components/angular-resource/angular-resource.min.js': 'angular-resource/angular-resource.min.js',
                    'Angular/components/angular-sanitize/angular-sanitize.min.js': 'angular-sanitize/angular-sanitize.min.js',
                    'Angular/components/angular-ui-router/angular-ui-router.min.js': 'angular-ui-router/release/angular-ui-router.min.js',
                    'Angular/components/angular-idle/angular-idle.min.js': 'ng-idle/angular-idle.min.js',
                    'AdminLTE/plugins/oclazyload': 'oclazyload/dist',
                    'NgTable': 'ng-table/dist'
                }
            },
            cssLibs: {
                options: {
                    destPrefix: 'src/Content/Css/Libs'
                },
                files: {
                    'AdminLTE': 'admin-lte/dist/css',
                    'Bootstrap': 'admin-lte/bootstrap/css',
                    'Font-Awesome': 'components-font-awesome/css',
                    'Ionicons': 'ionicons/css'
                }
            },
            fontLibs: {
                options: {
                    destPrefix: 'src/Content/Css/Libs'
                },
                files: {
                    'fonts': ['bootstrap/fonts', 'components-font-awesome/fonts', 'ionicons/fonts']
                }
            }
        },
        clean: {
            main: {
                options: {
                    'no-write': false
                },
                src: ['./bower_components/**/*']
            },
            other: {
                options: {
                    'no-write': false
                },
                src: ['./dist/**', './src/Content/Js/Libs/RequireJs/**/*', './src/Content/Js/Libs/AdminLTE/**/*', './src/Content/Js/Libs/Angular/**/*', './src/Content/Js/Libs/Bootstrap/**/*', './src/Content/Js/Libs/jointJsBundle/**/*', './src/Content/Js/Libs/Jquery/**/*', './src/Content/Css/Libs/**/*', './src/Content/Fonts/**/*']
            }
        },
        copy: {
            srcTodist: {
                files: [
                    {
                        expand: true,
                        cwd: './src',
                        src: '**',
                        dest: 'dist/',
                        flatten: false
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            dynamic_mappings: {
                files: [
                    {
                        expand: true, // Enable dynamic expansion.
                        cwd: './src/', // Src matches are relative to this path.
                        src: ['**/*.js', '!*.min.js'], // Actual pattern(s) to match.
                        dest: './dist/', // Destination path prefix.
                        ext: '.js', // Dest filepaths will have this extension.
                        extDot: 'last'   // Extensions in filenames begin after the first dot
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: [{
                        expand: true,
                        cwd: './src/',
                        src: ['**/*.css', '!*.min.css'],
                        dest: './dist/',
                        ext: '.css'
                    }]
            }
        },
        htmlmin: {// Task
            dist: {// Target
                options: {// Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                        expand: true,
                        cwd: './src/',
                        src: ['**/*.html', '!*.min.html'],
                        dest: './dist/',
                        ext: '.html',
                        extDot: 'last'
                    }]
            }
        }

    });

    // Register Task List... [BuidWeb], [ClearBuild], [Clean]
    grunt.registerTask('buildweb', ['bowercopy', 'copy:srcTodist', 'clean:other', 'uglify', 'cssmin', 'htmlmin']);
    grunt.registerTask('clearbuildweb', ['clean:main', 'clean:other', 'buildweb']);
    grunt.registerTask('clearbuild', ['clean:main']);
    //
};