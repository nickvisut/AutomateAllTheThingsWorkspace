module.exports = function(grunt) {
	// first line added; just names and creates a custom task
	//
	// grunt.registerTask('hello', 'Hello World.', function() {
	//     grunt.log.write('Hello world from grunt...').ok();
	// });

	// replaced by load-grunt-tasks, which does auto-registration
	// grunt.loadNpmTasks('grunt-contrib-clean');
	// grunt.loadNpmTasks('grunt-contrib-copy');

	// replaced in initConfig with the multi-target
 	// version: {
	//     options: {
	//         buildNumber: "1.0." + (+new Date())
	//     }
	// }


	grunt.initConfig({
		clean: ['./dist'],
	    copy: {
	        release: {
	            files: [ { src: './**', dest: './dist/' } ]
	        }
	    },
		version: {
		    release: {
		        options: {
		            buildNumber: "1.0." + (+new Date())
		        }
		    },
		    dev: {
		        options: {
		            buildNumber: function() {
		                var package = JSON.parse(grunt.file.read('./package.json'));
		                var chunks = package.version.split('.');
		                chunks[1] = parseInt(chunks[1], 10) + 1;
		                return chunks.join('.') + '-pre';
		            }()
		        }
		    }
		}
	});

	// TODO: so how does this know about grunt-contrib-*?
	require('load-grunt-tasks')(grunt);

	// replaced registerTask with multi
	//
	// puts 1.0. and milliseconds as version into package.json
	// grunt.registerTask('version', 'Add build number to the package.json', function() {
	// 	var package = JSON.parse(grunt.file.read('./package.json'));
	// 	package.version = this.options().buildNumber;

	// 	grunt.file.write('./dist/package.json', JSON.stringify(package, null, 2));
	// });

	// puts 1.0. and milliseconds as version into package.json
	grunt.registerMultiTask('version', 'Add build number to the package.json', function() {
		var package = JSON.parse(grunt.file.read('./package.json'));
		package.version = this.options().buildNumber;

		grunt.file.write('./dist/package.json', JSON.stringify(package, null, 2));
	});

	grunt.registerTask('default', ['clean', 'copy', 'version:release']);
};
