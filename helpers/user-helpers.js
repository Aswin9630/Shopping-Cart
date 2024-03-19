const db = require('../config/connection');
const collection = require('../config/collections');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb')
const { response } = require('express');
const { log } = require('handlebars');
const saltRounds = 10; // Number of salt rounds to use

module.exports ={
    doSignup : (userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,saltRounds);
            db.get().collection(collection.USER_COLLECTION).insertOne(userData)
            .then((data)=>{
                resolve(data.insertedId)
            })
        })
    },

    
    doLogin : (userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}

            let user =await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email});

            if(user){
                bcrypt.compare(userData.Password,user.Password) .then((status)=>{
                    if(status){
                        console.log('login success');
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login failed! user not exist.")
                resolve({status:false})
            }
        })
    },
      
    addToCart: (proId, userId) => {
       
        const UserId=new ObjectId(userId)
        const ProId=new ObjectId(proId) 

        return new Promise(async (resolve, reject) => {
            const userCart = await db.get().collection(collection.CART_COLLECTION).findOne({ user:UserId })
    
            if (userCart) {
                console.log("if case")
                db.get().collection(collection.CART_COLLECTION)
                    .updateOne({ user:UserId }, {
                        $push: { "products":ProId}
                    }).then((response) => {
                        resolve()
                    })
    
            } else {
                console.log("else")
                let cartObj = {
                    user:UserId,
                    products: [ProId]
                }
                db.get().collection(collection.CART_COLLECTION).insertOne(cartObj).then((response) => {
                    resolve()
                })
            }
        })
    }
}
    