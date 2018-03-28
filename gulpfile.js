/**
 * Gulpfile.
 * Project Configuration for gulp tasks.
 */

var pkg                     	= require('./package.json');
var project                 	= 'Gutenberg Spacer Block by GutenKit';
var slug                    	= pkg.slug;
var version                	= pkg.version;
var license                	= pkg.license;
var copyright              	= pkg.copyright;
var author                 	= pkg.author;
var plugin_uri              	= pkg.plugin_uri;

var buildFiles      	    	= ['./**', '!.gitattributes', '!node_modules/**', '!*.sublime-project', '!gulpfile.js', '!*.json', '!*.map', '!*.eslintignore', '!*.editorconfig', '!*.md', '!*.sublime-workspace', '!*.sublime-gulp.cache', '!*.log', '!CONTRIBUTING.md', '!*.DS_Store','!*.gitignore', '!*.git' ];
var buildDestination        	= './.org/'+ slug +'/';
var distributionFiles       	= './.org/'+ slug +'/**/*';

/**
 * Browsers you care about for autoprefixing. https://github.com/ai/browserslist
 */
const AUTOPREFIXER_BROWSERS = [
    'last 2 version',
    '> 1%',
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4',
    'bb >= 10'
];

/**
 * Load Plugins.
 */
var gulp         = require('gulp');
var concat       = require('gulp-concat');
var cleaner      = require('gulp-clean');
var minifycss    = require('gulp-uglifycss');
var rename       = require('gulp-rename');
var sort         = require('gulp-sort');
var notify       = require('gulp-notify');
var runSequence  = require('run-sequence');
var copy         = require('gulp-copy');
var filter       = require('gulp-filter');
var replace      = require('gulp-replace-task');
var csscomb      = require('gulp-csscomb');
var cache        = require('gulp-cache');
var uglify       = require('gulp-uglify');
var wpPot        = require('gulp-wp-pot');
var zip          = require('gulp-zip');
var reload       = browserSync.reload;

gulp.task('clear', function () {
	cache.clearAll();
});

// gulp.task( 'translate', function () {

// 	gulp.src( translatableFiles )

// 	.pipe( sort() )
// 	.pipe( wpPot( {
// 		domain        : text_domain,
// 		destFile      : destFile,
// 		package       : project,
// 		bugReport     : bugReport,
// 		lastTranslator: lastTranslator,
// 		team          : team
// 	} ))
// 	.pipe( gulp.dest( translatePath ) )

// });

gulp.task( 'clean', function () {
	return gulp.src( ['./dist/*'] , { read: false } )
	.pipe( cleaner() );
});

gulp.task( 'copy', function() {
    return gulp.src( buildFiles )
    .pipe( copy( buildDestination ) );
});

gulp.task( 'variables', function () {
	return gulp.src( distributionFiles )
	.pipe( replace( {
		patterns: [
		{
			match: 'pkg.version',
			replacement: version
		},
		{
			match: 'textdomain',
			replacement: pkg.textdomain
		},
		{
			match: 'pkg.name',
			replacement: project
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
	}))
	.pipe( gulp.dest( buildDestination ) );
});

gulp.task( 'zip', function() {
    return gulp.src( buildDestination+'/**', { base: 'dist'} )
    .pipe( zip( slug +'.zip' ) )
    .pipe( gulp.dest( './dist/' ) );
});

gulp.task( 'clean-after-zip', function () {
	return gulp.src( [ buildDestination, '!/dist/' + slug + '.zip'] , { read: false } )
	.pipe(cleaner());
});

gulp.task( 'finished', function () {
	return gulp.src( '' )
	.pipe( notify( { message: 'Your build of ' + packageName + ' is complete.', onLast: false } ) );
});

/**
 * Commands.
 */

gulp.task( 'build', function(callback) {
	runSequence( 'clear', 'clean', 'copy', 'variables', 'zip', 'clean-after-zip', 'finished', callback );
});