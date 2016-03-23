var through = require('through2');
var gutil = require('gulp-util');
var fs = require('fs');
var PluginError = gutil.PluginError;

// 常量
const PLUGIN_NAME = 'gulp-prefixer';

// 插件级别的函数（处理文件）
function gulpPrefixer(options) {
	var files = options.files;
	if(!files.length) return;
	function getHeader(textName){
		var defineHeader = new Buffer('define("'+textName+'",function(){ return \'');
		return defineHeader;
	} 
    var content = new Buffer("");
	var defindFooter = new Buffer('\';});');
	files.forEach(function(file){
		var bfContent = fs.readFileSync(file.path);
		var stringContent = bfContent.toString('utf8').replace(/\r?\n/g,'').replace(/'/g,'\\\'');
		bfContent = new Buffer(stringContent);
		content = Buffer.concat([content,getHeader(file.defineName),bfContent,defindFooter])
	})
  

  // 创建一个 stream 通道，以让每个文件通过
  var stream = through.obj(function(file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      file.contents = Buffer.concat([ file.contents,content]);
    }

    this.push(file);
    // 告诉 stream 引擎，我们已经处理完了这个文件
    cb();
  });
	console.log('ok')
  // 返回文件 stream
  return stream;
};

// 导出插件主函数
module.exports = gulpPrefixer;