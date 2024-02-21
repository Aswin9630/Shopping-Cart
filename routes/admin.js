var express = require('express');
var router = express.Router();
var productHelper= require('../helpers/product-helpers');
const productHelpers = require('../helpers/product-helpers');
/* GET users listing. */
router.get('/', function(req, res, next) {

  let products=[
    {
      name:"SAMSUNG Galaxy S24 Ultra 5G",
      category:"Mobile",
      description:"(Titanium Gray, 256 GB)  (12 GB RAM)",
      image:"https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/f/n/u/-original-imagx9egm9mgmvab.jpeg?q=90&crop=false"
    },

    {
      name:"Apple iPhone 15 Pro",
      category:"Mobile",
      description:" (Blue Titanium, 128 GB)",
      image:"https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1694674264/Croma%20Assets/Communication/Mobiles/Images/300785_0_ikcks6.png"
    },

    {
      name:"OnePlus 11 5G",
      category:"Mobile",
      description:"(Eternal Green, 256 GB)  (16 GB RAM)",
      image:"https://oasis.opstatics.com/content/dam/oasis/page/2023/na/oneplus-11/specs/green-img.png"
    },

    {
      name:"Oppo F5",
      category:"Mobile",
      description:" (Black, 64 GB)  (6 GB RAM) ",
      image:"https://www.refurbkart.com/cdn/shop/files/Oppo_F5_Youth_grande.jpg?v=1683876177"
    }
  ]


  res.render('admin/view-products',{admin:true,products})
});

router.get('/add-product',(req,res)=>{
  res.render('admin/add-product')
})

router.post('/add-product',(req,res)=>{
  console.log(req.body);
  console.log(req.files.Image);
  productHelper.addProduct(req.body,(result)=>{
   res.render("admin/add-product") 
  })
})

module.exports = router;
