// 用户状态检查的中间件
exports = module.exports = {
  // 检查需要登录的情况
  checkLogin(req, res, next) {
    // 如果用户信息不存在则认为用户未登录
    if(!res.session.user) {
      // 页面通知
      req.flash('error', '未登录');

      return res.redirect('/signin');
    }

    next();
  },

  // 检查不需要登录的情况
  checkNotLogin(req, res, next) {
    // 如果用户信息存在则认为用户已登录
    if(res.session.user) {
      req.flash('error', '已登录');

      return res.redirect('back'); // 返回之前的页面
    }

    next();
  }
};
