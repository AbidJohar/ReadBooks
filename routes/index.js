var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res,next) {
  res.render('index', { nav: true,footer: true });
});
router.get('/category', function(req, res,next) {
  res.render('category', { nav: true,footer: true });
});
router.get('/write', function(req, res,next) {
  res.render('write', { nav: true,footer: true });
});
router.get('/bookdetail', function(req, res,next) {
  res.render('bookdetail', { nav: true,footer: true });
});

router.get('/profile', function(req,res,next){
  res.render('profile', {nav: true,footer: true});
})
router.get('/adminpanel', function(req,res,next){
  res.render('adminpanel', {nav: true, footer: false});
})

module.exports = router;
