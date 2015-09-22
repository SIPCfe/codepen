var express = require("express"),
	app = express(),
	path = require("path"),
    port = process.env.PORT || 80,
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    RedisStore = require('connect-redis')(session),
    bodyParser = require('body-parser'),
    multer = require('multer');
/*
 *视图模板，引擎设置
 */
app.set('views', './application/views/pages');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/static_resource'));  //确定静态文件的路径

/*
 * cookie 与 session环境配置
 */

app.use(cookieParser("codepen"));
app.use(session({
	store: new RedisStore({
		host: "127.0.0.1",
    	port: 6379
  	}),
  	resave: false,
  	saveUninitialized: false,
  	secret: 'codepen'
}))

app.listen(port);
require("./config/router.js")(app);   /*执行路由*/
