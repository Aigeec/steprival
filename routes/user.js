var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:userid', function(req, res, next) {
  console.log('userid: ', req.params.userid);
  if(req.params.userid === req.user._id){
    res.render('user', { user: req.user, messages: req.flash('info') });
  } else {
    req.flash('info', 'For now you may only view your own profile');
    res.redirect('/user/' + req.user._id);
  }
});

module.exports = router;
