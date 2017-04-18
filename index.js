const path = require('path');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const config = require('config-lite');
const routes = require('./routes');
const pkg = require('./package.json');
const winston = require('winston');
const expressWinston = require('express-winston');

const app = express();

// 设置模版目录
app.set('views', path.join(__dirname, 'views'));
// 设置模版引擎为 ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge, // 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({ // 将 session 存储到 mongodb
    url: config.mongodb, // mongodb 地址
  }),
}));

// flash 中间件，用来显示通知
app.use(flash());

// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
  keepExtensions: true, // 保留后缀
}));

// 设置模版全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description,
};

// 添加模版必须的三个变量
app.use(function(req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();

  next();
});

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true,
    }),
    new (winston.transports.File)({
      filename: 'logs/success.log',
    }),
  ]
}));

// 路由
routes(app);

// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true,
    }),
    new (winston.transports.File)({
      filename: 'logs/error.log',
    }),
  ]
}));

// error page
app.use((err, req, res, next) => {
  res.render('error', {
    error: err,
  });
});

if(module.parent) {
  exports = module.exports = app;
}
else {
  // 监听端口，启动程序
  app.listen(config.port, () => {
    console.log(`${pkg.name} listening on  http://localhost:${config.port}`);
  });
}
