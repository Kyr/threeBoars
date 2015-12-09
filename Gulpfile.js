const EXPRESS_PORT = 3000;
const LIVERELOAD_PORT = 35729;
const EXPRESS_ROOT = __dirname;

var gulp = require('gulp');
var lr = require('tiny-lr');

/**
 * This modules required for build vendor.(js|css) in same order as they mentioned in according arrays
 * TODO Not right now, CDN enough
 */
var vendorsModules = {
	js: ['angular'],
	css: []
};

gulp.task('default', function(){

	startExpress();
	//startLiveReload();
});

gulp.task('vendorJs', function(){

});

function startExpress(){
	var express = require('express');
	var app = express();

	app.use(require('connect-livereload')());
	app.use(express.static(EXPRESS_ROOT));

	app.listen(EXPRESS_PORT);

}

function startLiveReload(){
	lr.listen(LIVERELOAD_PORT);
}