/*
	入口文件
*/

// 加载模块
var express = require('express');
// 加载模块处理模块
var swig = require('swig');

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
	首页
	req
	res (res.send()内容输出)
	next 函数
*/
//  路由绑定
// 内容输出
app.get('/', function(req, res, next) {
	// res.send('<h1>欢迎光临</h1>');
	// 读取views目录下的指定文件，解析并返回给客户端
	// 第一个参数表示模版文件，相对于views目录的路径
	res.render('index');

});





app.listen(8081);

