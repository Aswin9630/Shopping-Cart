const express = require('express');
const router = express.Router();
const productHelpers = require('../helpers/product-helpers');
const userHelpers = require('../helpers/user-helpers');

const verifyLogin=(req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('user/login')
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {

  let user=req.session.user
  console.log(user);
  productHelpers.getAllProducts().then((products)=>{
    res.render('user/view-products',{products,user})

  })
});

router.get('/login',(req,res)=>{
  console.log("req.session:", req.session);
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
    res.render('user/login',{"loginErr":req.session.loginErr})
    req.session.loginErr=false;
  }
 
});


router.get('/signup',(req,res)=>{
  res.render('user/signup')
});



router.post('/signup',(req,res)=>{
 userHelpers.doSignup(req.body).then((response)=>{
  console.log(response)
  
    req.session.loggedIn=true;
    req.session.user=response;
    res.render('user/login')
  
 })
 .catch((error) => {
  console.error(error);
  res.status(500).send('Error during signup'); // Send an error message to the client if there is an error
});

})


router.post('/login',(req,res)=>{
  console.log("req.session:", req.session);
  userHelpers.doLogin(req.body).then((response)=>{
    if(response.status){
      console.log("req.session.user",req.session.user)
      req.session.user=response.user;
      req.session.loggedIn=true;
      res.redirect('/')

    }else{
      req.session.loginErr="Invalid username or password";
      res.redirect('/login')
    }
  })
  
})


router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/')
})


router.get('/cart',verifyLogin,(req,res)=>{
  res.render('user/cart')
})

router.get('/add-to-cart/:id',(req,res)=>{
  console.log("add-to-cart req.session.user",req.session.user)
  console.log("add-to-cart req.session",req.session)
  if(req.session && req.session.user){

    const userId=req.session.user._id;
    const proId=req.params._id;
    
    console.log("userId",userId)
    console.log("proId",proId)

    userHelpers.addToCart(proId,userId).then(()=>{
      res.redirect('/');
    })

  }else{
    res.render('user/login')
  }
})

module.exports = router;
