module.exports = function(grunt) {
	// first line added; just names and creates a custom task
	//
	// grunt.registerTask('hello', 'Hello World.', function() {
	//     grunt.log.write('Hello world from grunt...').ok();
	// });

	// replaced by load-grunt-tasks, which does auto-registration
	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.initConfig({
		clean: ['./dist'],
	    copy: {
	        release: {
	            files: [ { src: './**', dest: './dist/' } ]
	        }
	    }
	});

	// TODO: so how does this know about grunt-contrib-*?
	require('load-grunt-tasks')(grunt);

	grunt.registerTask('default', ['clean', 'copy']);
};
