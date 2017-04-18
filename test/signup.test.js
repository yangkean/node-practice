const path = require('path');
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../index');
const User = require('../lib/mongo').User;

const agent = supertest.agent(app); // 把 cookie 保存下来

describe('用户注册功能测试', function() {
  // afterEach(function(done) {
  //   // 清空 users 表
  //   User.remove({})
  //     .exec()
  //     .then(done)
  //     .catch(done);
  // });

  it('错误用户名测试', function() {
    agent
      .post('/signup')
      .type('form')
      .attach('name', '')
      .attach('gender', 'm')
      .attach('bio', 'hello')
      .attach('avatar', path.join(__dirname, 'avatar.png'))
      .attach('password', '123456')
      .attach('repassword', '123456')
      .redirects()
      .end(function(err, res) {
        expect(res.text).to.be.equal('名字请限制在 1-10 个字符');

        done();
      });
  });

  it('错误性别测试', function() {
    agent
      .post('/signup')
      .type('form')
      .attach('name', 'sam')
      .attach('gender', 'a')
      .attach('bio', 'hello')
      .attach('avatar', path.join(__dirname, 'avatar.png'))
      .attach('password', '123456')
      .attach('repassword', '123456')
      .redirects()
      .end(function(err, res) {
        expect(res.text).to.be.equal('性别只能是 m、f 或 x');

        done();
      });
  });

  // ... 其他测试类似
});
