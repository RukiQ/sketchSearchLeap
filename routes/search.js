var express = require('express');
var router = express.Router();

// 通过直接render页面，数据需要从public的js中另外发请求渲染
router.get('/', function(req, res, next) {
    res.render('search');
    res.end();
});

module.exports = router;