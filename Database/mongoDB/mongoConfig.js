// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
 
// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'product_info';
 
// Use connect method to connect to the server
const findItemsSku = function(sku, callback) {
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  require('dotenv').config();
  // Connection URL
  const url = process.env.MONGODB_HOST;

  // Database Name
  const dbName = process.env.MONGODB_DB;
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    const db = client.db(dbName);
      findDocuments(db, callback);
  });

  const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('products');
    // Find some documents
    collection.find({"_id": Number(sku)}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(err, docs);
      // client.close();
    });
  }
}

const getSimilarImages = function(title, callback) {
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  require('dotenv').config();
  // Connection URL
  const url = process.env.MONGODB_HOST;

  // Database Name
  const dbName = process.env.MONGODB_DB;
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
  
    const db = client.db(dbName);
      findImages(db, callback);
  });
  
  const regex = `${title}`;
  const findImages = function(db, callback) {
    // Get the documents collection
    console.log('title: ', title);
    const collection = db.collection('products');
    // Find some documents
    collection.find({"title": {$regex: regex}}).limit(5).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      callback(err, docs);
      // client.close();
    });
  }
}

module.exports = {findItemsSku, getSimilarImages};
// db.bios.find().sort( { name: 1 } ).limit( 5 )