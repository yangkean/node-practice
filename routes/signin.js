const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登陆页
router.get('/', checkNotLogin, (req, res, next) => {
  res.send(req.flash());
});

// POST /signin 用户登录
router.get('/', checkNotLogin, (req, res, next) => {
  res.send(req.flash());
});

exports = module.exports = router;
