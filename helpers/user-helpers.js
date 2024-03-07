const db = require('../config/connection');
const collection = require('../config/collections');
const bcrypt = require('bcrypt');
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
    }

}
