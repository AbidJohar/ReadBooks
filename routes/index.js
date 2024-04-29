var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport')
const localStrategy = require('passport-local');
const upload = require('./multer');
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */
router.get('/', async function(req, res, next) {
  if (req.isAuthenticated()) {
    const finduser = await userModel.findOne({username:req.session.passport.user});
    res.render('index', { nav: true, footer: true, user: true, finduser});
  } 
    res.render('index', { nav: true, footer: true, user: false });
  
});
router.get('/category', async function(req, res,next) {
  if (req.isAuthenticated()) {
    const finduser = await userModel.findOne({username:req.session.passport.user});
  res.render('category', { nav: true,footer: true,user:true,finduser });
}
res.render('category', { nav: true,footer: true,user:false });
});
router.get('/write', function(req, res,next) {
  if (req.isAuthenticated()) {
  res.render('write', { nav: false,footer: false,user:true });
}
res.render('write', { nav: false,footer: false,user:false });

});
router.get('/bookdetail',async function(req, res,next) {
  if (req.isAuthenticated()) {
    const finduser = await userModel.findOne({username: req.session.passport.user});
  res.render('bookdetail', { nav: true,footer: true,user:true, finduser });
}
res.render('bookdetail', { nav: true,footer: true,user:false });
});

router.get('/profile', async function(req,res,next){
  if (req.isAuthenticated()) {
    const finduser = await userModel.findOne({username:req.session.passport.user});
    res.render('profile', {nav: true,footer: true,user:true, finduser});
  } else {
    res.render('index', { nav: true, footer: true, user: false });
  }

})
router.get('/adminpanel', function(req,res,next){
  if (req.isAuthenticated()) {
  res.render('adminpanel', {nav: true, footer:false,user:true });
}
res.render('adminpanel', {nav: true, footer:false,user:false });
})
router.get('/authorprofile', function(req,res,next){
  if (req.isAuthenticated()) {
  res.render('authorprofile', {nav: true, footer:false,user:true });
}
res.render('authorprofile', {nav: true, footer:false,user:false });
})
router.get('/authordashboard', function(req,res,next){
  if (req.isAuthenticated()) {
  res.render('authordashboard', {nav: true, footer:false,user:true });
}
res.render('authordashboard', {nav: true, footer:false,user:false });
})
router.post('/upload', upload.single('image'),async function (req, res, next) {
   const user = await userModel.findOne({username: req.session.passport.user});
   user.profileimg = req.file.filename;
   await user.save();
   res.redirect('/profile');
});

router.post('/usersignup', function(req,res,next){
  var userData = new userModel({
   username : req.body.username,
   email: req.body.email,
  })
  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate('local')(req,res, function(){
         res.redirect('/');
    });
    
  })
})
router.get('/usersignup', function(req,res,next){
  res.render('usersignup', {nav:false,footer:false});
})

router.get('/userlogin', function(req,res,next){
  res.render('userlogin', {nav:false,footer:false});
});

router.post('/userlogin', passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect: '/userlogin',
}),function(req,res){

});

router.get('/logout', function(req, res, next) {
  // Log out the user
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    // Redirect the user to the homepage after logout
    res.redirect('/');
  });
});
function isLoggedIn(req,res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/usersignup');
}


module.exports = router;
