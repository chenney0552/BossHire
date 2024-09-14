var express = require('express');
var router = express.Router();
const md5 = require('blueimp-md5')
const {UserModel} = require('../db/models')
const filter = {password: 0, __v: 0}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

// register router
router.post('/register', function (req, res) {
  // read request data
  const {username, password, type} = req.body;

  // 处理注册
  // 检查用户是否存在，如果存在则返回错误消息
  // 如果用户不存在，创建用户
  UserModel.findOne({username: username}, function (err, user) {
    if (err) {
      res.send({code: 500, msg: 'server error'});
    } else if (user) {
      res.send({code: 1, msg: 'user exists'});
    } else {
      new UserModel({username: username, password: md5(password), type: type}).save(function (err, user) {
        if (err) {
          res.send({code: 500, msg: 'error when create user'});
        } else {
          res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7});
          res.send({code: 0, data: {_id: user._id, username: username, type}});
        }
      });
    }
  });
});

// login router
router.post('/login', function (req, res) {
  // 读取请求数据
  const {username, password} = req.body;
  // 处理登录
  // 检查用户是否存在，如果不存在则返回错误消息
  // 如果用户存在，检查密码是否正确
  UserModel.findOne({username: username, password: md5(password)}, filter, function (err, user) {
    if (err) {
      res.send({code: 500, msg: 'server error'});
    } else if (!user) {
      res.send({code: 1, msg: 'username or password is incorrect'});
    } else {
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7});
      // 从用户对象中删除密码
      const userDoc = user.toObject();
      delete userDoc.password;
      res.send({code: 0, data: userDoc});
    }
  });
});


module.exports = router;