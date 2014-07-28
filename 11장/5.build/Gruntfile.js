module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            product: {
                src: ['src/**/*.js'],
                directives : {
                    nomen: true,
                    white: true,
                    unparam : true,
                    sloppy : true,
                    browser: true,
                    predef : [
                        'naver',
                        '$',
                        '_'
                    ]
                }
            }
        },
        jsdoc : {
            dist: {
                src: ['README.md'],
                options: {
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
                    'src/organizationTree.js',
                    'src/naver.*.js'
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

    // Load the plugin that provides the 'uglify' task
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['jslint', 'jsdoc', 'concat', 'uglify']);
};
