
var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcrypt');

module.exports={
    doSignup:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            userData.Password=await bcrypt.hash(userData.Password,10)
            console.log(userData)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData)
            .then((data)=>{
                resolve(data.ops[0])
            })
        })
    }
}


// const db = require('../config/connection');
// const collection = require('../config/collections');
// const bcrypt = require('bcrypt');

// module.exports = {
//     doSignup: async (userData) => {
//         try {
//             if (!userData.Password) {
//                 throw new Error('Password is missing');
//             }
            
//             userData.Password = await bcrypt.hash(userData.Password, 10);
//             const result = await db.get().collection(collection.USER_COLLECTION).insertOne(userData);
//             return result.ops[0];
//         } catch (error) {
//             throw error;
//         }
//     }
// };
