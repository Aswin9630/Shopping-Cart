var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products',{products})

  })
});

router.get('/login',(req,res)=>{
  res.render('user/login')
});

router.get('/signup',(req,res)=>{
  res.render('user/signup')
});



router.post('/signup',(req,res)=>{
 userHelpers.doSignup(req.body).then((response)=>{
  console.log(response)
  res.render('user/login')
 })
 .catch((error) => {
  console.error(error);
  res.status(500).send('Error during signup'); // Send an error message to the client if there is an error
});

})



router.post('/login', (req, res) => {
  userHelpers.insertUser(req.body).then((response) => {
      console.log(response);
      res.redirect('/');
  }).catch((error) => {
      console.error(error);
      res.redirect('/login');
  });
});

module.exports = router;
