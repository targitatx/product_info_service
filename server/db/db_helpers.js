const db = require('./config.js');

const getCurrentProduct = (sku, callback) => {
  db.query(`SELECT * FROM products WHERE sku = ${sku}`, (err, data) => {
    if (err) {
      console.log('error getting data from db:', err);
      callback(err);
    } else {
      callback(null, data);
    }
  })
}


const getRelatedImages = (title, callback) => {
  console.log('title in getRelatedImages:', title);
  db.query(`SELECT photo_url FROM products WHERE title LIKE '%${title}'`, (err, data) => {
    if (err) {
      console.log('error getting images from db:', err);
      callback(err);
    } else {
      callback(null, data)
    }
  }) 

}

module.exports = { getCurrentProduct, getRelatedImages };


