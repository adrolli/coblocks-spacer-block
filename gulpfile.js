/**
 * Gulpfile.
 * Project Configuration for gulp tasks.
 */

var pkg                     	= require('./package.json');
var slug                    	= pkg.slug;
var version                	= pkg.version;
var license                	= pkg.license;
var copyright              	= pkg.copyright;
var author                 	= pkg.author;
var plugin_uri              	= pkg.plugin_uri;

var buildDirectory              = 'build';
var buildFiles      	    	= ['./**', '!.gitattributes', '!node_modules/**', '!*.sublime-project', '!gulpfile.js', '!*.json', '!*.map', '!*.eslintignore', '!*.editorconfig', '!*.md', '!*.sublime-workspace', '!*.sublime-gulp.cache', '!*.log', '!CONTRIBUTING.md', '!*.DS_Store','!*.gitignore', '!*.git' ];
var buildDestination        	= './' + buildDirectory + '/' + slug + '/';
var buildDirectoryFiles        	= './' + buildDirectory + '/' + slug + '/**/*';

/**
 * Load Plugins.
 */
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var cleaner      = require('gulp-clean');
var exec         = require('gulp-exec');
var minifycss    = require('gulp-uglifycss');
var rename       = require('gulp-rename');
var sort         = require('gulp-sort');
var notify       = require('gulp-notify');
var copy         = require('gulp-copy');
var replace      = require('gulp-replace-task');
var csscomb      = require('gulp-csscomb');
var runSequence  = require('run-sequence');
var cache        = require('gulp-cache');
var uglify       = require('gulp-uglify');
var wpPot        = require('gulp-wp-pot');
var zip          = require('gulp-zip');
var run          = require('gulp-run-command').default;

/**
 * Tasks.
 */
gulp.task('clear', function () {
	cache.clearAll();
} );

gulp.task( 'clean', function () {
	return gulp.src( [ './' + buildDirectory + '/*' ] , { read: false } )
	.pipe( cleaner() );
} );

gulp.task( 'npm-build', run( 'npm run build' ) )

gulp.task( 'copy', function() {
    return gulp.src( buildFiles )
    .pipe( copy( buildDestination ) );
} );

gulp.task( 'translate', function () {

	gulp.src( buildFiles )

	.pipe( sort() )

	.pipe( wpPot( {
		domain        : '@@textdomain',
		destFile      : slug + '.pot',
		package       : pkg.title,
		bugReport     : pkg.author_uri,
		lastTranslator: pkg.author,
		team          : pkg.author_shop
	} ) )

	.pipe( gulp.dest( './languages' ) )

} );

gulp.task( 'variables', function () {
	return gulp.src( buildDirectoryFiles )
	.pipe( replace( {
		patterns: [
		{
			match: 'pkg.version',
			replacement: version
		},
		{
			match: 'textdomain',
			replacement: slug
		},
		{
			match: 'pkg.title',
			replacement: pkg.title
		},
		{
			match: 'pkg.slug',
			replacement: slug
		},
		{
			match: 'pkg.license',
			replacement: pkg.license
		},
		{
			match: 'pkg.plugin_uri',
			replacement: pkg.plugin_uri
		},
		{
			match: 'pkg.author',
			replacement: pkg.author
		},
		{
			match: 'pkg.author_uri',
			replacement: pkg.author_uri
		},
		{
			match: 'pkg.requires',
			replacement: pkg.requires
		},
		{
			match: 'pkg.tested_up_to',
			replacement: pkg.tested_up_to
		}
		]
	} ) )

	.pipe( gulp.dest( buildDestination ) );
} );

gulp.task( 'zip', function() {
    return gulp.src( buildDestination + '/**', { base: buildDirectory } )
    .pipe( zip( slug +'.zip' ) )
    .pipe( gulp.dest( './' + buildDirectory ) );
} );

gulp.task( 'clean-after-zip', function () {
	return gulp.src( [ buildDestination, '!/' + buildDirectory + slug + '.zip'] , { read: false } )
	.pipe(cleaner());
} );

gulp.task( 'finished', function () {
	return gulp.src( '' )
	.pipe( notify( { message: 'Your build of the ' + pkg.title + ' is complete!', onLast: false } ) );
} );

/**
 * Build Command.
 */
gulp.task( 'build', function( callback ) {
	runSequence( 'clear', 'clean', 'translate', 'npm-build', 'copy', 'variables', 'zip', 'clean-after-zip', 'finished', callback );
} );