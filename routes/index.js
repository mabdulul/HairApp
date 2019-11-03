var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('template',{
       locals :{
         title: '',
         isLoggedIn : req.session.is_logged_in,
         UserName: req.session.firstname
       },
       partials : {
        partial:"partial-index"
       }
  })

});

module.exports = router;



