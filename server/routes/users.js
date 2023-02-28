const { response } = require("express");
const express = require("express");

// userRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /tweet.
const userRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

userRoutes.route("/users").get(async (req, res) => {
  let db_connect = dbo.getDb();

  db_connect
    .collection("users")
    .find({})
    .toArray()
    .then((data) => {
      res.json(data);
    });
});

userRoutes.route("/users/add").post((req, res) => {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    photo: req.body.photo,
    password: req.body.password,
  };
  db_connect
    .collection("users")
    .insertOne(myobj, function (err, res) {
      if (err) throw err;
      res.json(res);
    })
    .catch((err) => {
      console.error(err);
    });
});

userRoutes.route("/user/:userName").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.userName };

  db_connect
    .collection("users")
    .findOne(myquery)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

userRoutes.route("/userupdate/:userName").post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { name: req.params.userName };
  let newvalues = {
    $set: {
      name: req.params.userName,
      photo: req.body.photo,
      password: req.body.password,
    },
  };
  db_connect
    .collection("users")
    .updateOne(myquery, newvalues, (err, res) => {
      if (err) throw err;
      response.json(res);
    })
    .then((data) => {
      res.json(data);
    });
});

// // This section will help you get a list of all the tweets.
// userRoutes.route("/tweets").get(async function (req, response) {
//   let db_connect = dbo.getDb();

//   db_connect
//     .collection("tweets")
//     .find({})
//     .toArray()
//     .then((data) => {
//       //   console.log(data);
//       response.json(data);
//     });
// });

// // This section will help you get a single tweet by id
// userRoutes.route("/tweet/:id").get(function (req, res) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: new ObjectId(req.params.id) };
//   db_connect
//     .collection("tweets")
//     .findOne(myquery)
//     .toArray()
//     .then((data) => {
//       res.json(data);
//     })
//     .error((err) => {
//       throw err;
//     });
//   /* , function (err, result) {
//       if (err) throw err;
//       res.json(result);
//     } */
// });

// // This section will help you create a new tweet.
// userRoutes.route("/tweet/add").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myobj = {
//     name: req.body.name,
//     tweetText: req.body.tweetText,
//     likes: req.body.likes,
//   };
//   db_connect.collection("tweets").insertOne(myobj, function (err, res) {
//     if (err) throw err;
//     response.json(res);
//   });
// });

// // This section will help you update a tweet by id.
// userRoutes.route("/update/:id").post(function (req, response) {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: new ObjectId(req.params.id) };
//   let newvalues = {
//     $set: {
//       name: req.body.name,
//       tweetText: req.body.tweetText,
//       likes: req.body.likes,
//     },
//   };
//   db_connect
//     .collection("tweets")
//     .updateOne(myquery, newvalues, function (err, res) {
//       if (err) throw err;
//       console.log("1 document updated");
//       console.log(err);
//       response.json(res);
//     });
// });

// // This section will help you delete a tweet
// userRoutes.route("/:id").delete((req, response) => {
//   let db_connect = dbo.getDb();
//   let myquery = { _id: new ObjectId(req.params.id) };
//   db_connect.collection("tweets").deleteOne(myquery, function (err, obj) {
//     if (err) throw err;
//     console.log("1 document deleted");
//     response.json(obj);
//   });
// });

module.exports = userRoutes;

// // how to select by one in mongo db server side?
// export async function getCreaterPubGameId(authorID: string) {
//   await client.connect();
//   console.log('Connected successfully to server : update, find or insertData');
//   const db = client.db(dbName);
//   const collection = db.collection('games');

// // I have to use 'projection'
//   return new Promise(function (resolve, reject) {
//     collection.find({ authorID }, { projection: { _id: true }).toArray((err, doc) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log('getAlldata : ', doc);
//         resolve(doc);
//       }
//     });
//   });
// }

//Source: https://stackoverflow.com/questions/70388802
