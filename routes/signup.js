const express = require('express');
const router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册页
router.get('/', checkNotLogin, (req, res, next) => {
  res.send(req.flash());
});

// POST /signup 用户注册
router.post('/', checkNotLogin, (req, res, next) => {
  res.send(req.flash());
});

exports = module.exports = router;
