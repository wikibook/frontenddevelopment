module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            spinbox: {
                src: ['src/**/*.js'],
                directives : {
                    nomen: true,
                    sloppy: true,
                    white: true,
                    browser: true,
                    predef : [
                        'naver',
                        '$'
                    ]
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        jsdoc : {
            dist: {
                src: ['README.md'],
                options: {
                    "template": "node_modules/ink-docstrap/template",
                    "encoding": "utf8",
                    "destination": "docs",
                    "recurse": true,
                    "private": true,
                    configure: 'jsdoc.conf.json'
                }
            }
        },
        concat : {
            dist : {
                src : [
                    'src/namespace.js',
                    'src/naver.SpinboxModel.js',
                    'src/naver.SpinboxView.js'
                ],
                dest: 'build/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },
        uglify : {
            dist : {
                files : {
                    'build/<%= pkg.name %>-<%= pkg.version %>.min.js': ['build/<%= pkg.name %>-<%= pkg.version %>.js']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks("grunt-contrib-uglify");

    // Default task(s).
    grunt.registerTask('default', ['jslint', 'karma', 'jsdoc', 'concat', 'uglify']);
};


