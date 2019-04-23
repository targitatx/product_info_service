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
  db.query(`SELECT photo_url FROM products WHERE title LIKE '%${title}' LIMIT 5`, (err, data) => {
    if (err) {
      console.log('error getting images from db:', err);
      callback(err);
    } else {
      callback(null, data)
    }
  }) 

}

module.exports = { getCurrentProduct, getRelatedImages };


