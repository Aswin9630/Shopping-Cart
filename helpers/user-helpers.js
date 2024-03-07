const db = require('../config/connection');
const collection = require('../config/collections');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds to use

module.exports = {

    doSignup: async (userData) => {
        try {
            
            // Check if userData.Password is provided and not empty
            if (!userData.Password || userData.Password.trim() === '') {
                throw new Error('Password is required');
            }
    
            // Generate a salt value using the number of salt rounds
            const salt = await bcrypt.genSalt(saltRounds);
    
            // Hash the password using the generated salt value
            const hashedPassword = await bcrypt.hash(userData.Password, salt);
    
            // Update the user data with the hashed password
            userData.Password = hashedPassword;
    
            // Insert the user data into the database
            const insertedUser = await db.get().collection(collection.USER_COLLECTION).insertOne(userData);
            console.log(insertedUser.insertedId); // Log the ID of the inserted user
            return insertedUser.insertedId;
        } catch (error) {
            console.error(error);
            throw error; // Rethrow the error for handling elsewhere if needed
        }
    },
    
        insertUser: async (userData) => {
            try {
                const result = await db.get().collection(collection.USER_COLLECTION).insertOne(userData);
                return result.insertedId;
            } catch (error) {
                console.error(error);
                throw error; // Rethrow the error for handling elsewhere if needed
            }
        }
    };
   