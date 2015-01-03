var express = require('express')
    ,router = express.Router()

/* GET home page. */
router.get('/', function(req, res) {
  res.render('home/index', { title: 'tiny blog' });
});

module.exports = router;
