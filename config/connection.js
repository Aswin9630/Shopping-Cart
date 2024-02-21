const { MongoClient } = require('mongodb')
// var state={
//     db:null
// }

// module.exports.connect = done => {
//   const dbname = 'shopping';
//     const url = 'mongodb://localhost:27017/dbname';
//     const client = new MongoClient(url);
  
//     client.connect()
//       .then(() => {
//         state.db = client.db(dbname);
//         console.log("Database connected");
//         done(null, state.db);
//       })
//       .catch(err => {
//         console.error("Error connecting to MongoDB:", err);
//         done(err, null); // Pass the error to the callback
//       });
//   };
  


// module.exports.get=()=>{
//     state.db;
// }

var state = {
  db: null
}

module.exports.connect = done => {
  const dbname = 'shopping';
  const url = 'mongodb://localhost:27017/' + dbname;
  const client = new MongoClient(url);

  client.connect()
      .then(() => {
          state.db = client.db(dbname);
          console.log("Database connected");
          done(null, state.db);
      })
      .catch(err => {
          console.error("Error connecting to MongoDB:", err);
          done(err, null); // Pass the error to the callback
      });
};

module.exports.get = () => {
  return state.db; // Return the database connection
}
