var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', function (req, res, next) {
    const { username, password } = req.body;
    if (username == 'admin') {
      res.send({code: 1, msg: 'user already exists'});
    } else {
      res.send({code: 0, data:{id: 'abc123', username, password}, msg: 'register success'});
    }
});

module.exports = router;