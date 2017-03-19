/*
	入口文件
*/

// 加载模块
var express = require('express');
// 加载模块处理模块
var swig = require('swig');
var mongoose = require('mongoose');


// 创建app应用 => NodeJS.createServer()
var app = express();

// 设置静态文件托管
// 当访问的URL以/public开始，那么直接返回__dirname + 'public'下的对应文件
app.use('/public', express.static(__dirname + '/public'));

// 配置应用模版
// 第一个参数 ： 模版引擎的名称， 同时也是模版文件的后缀
// 第二个参数 ： 解析方法
app.engine('html', swig.renderFile);

// 设置存放目录
app.set('views', './views');
// 第二个参数和app.engine方法中定义的模版引擎名称是一致的
app.set('view engine', 'html');
// 开发时 去掉缓存
swig.setDefaults({cache : false});


/*
	根据不同的功能划分模块
*/
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

mongoose.connect('mongodb://localhost:27018/blog', function(err) {
	if(err) {
		console.log(err)
	} else {
		console.log('succ')
		app.listen(8081);
	}
});






