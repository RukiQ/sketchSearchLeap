/*
 * @Author: Ruth
 * @Date:   2016-12-15 11:39:12
 * @Last Modified by:   Ruth
 * @Last Modified time: 2016-12-15 11:39:24
 */

'use strict';

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('main');
    res.end();
});

module.exports = router;