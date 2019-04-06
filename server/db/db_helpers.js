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
  db.query(`SELECT photo_url FROM products WHERE title LIKE _${title}_`, (err, data) => {
    if (err) {
      console.log('error getting images from db:', err);
      callback(err);
    } else {
      callback(null, data)
    }
  }) // comeback and just grab second word of title

}

module.exports = { getCurrentProduct };

// app.get('/product_info', (req, res) => {
//   db.query(`SELECT * FROM products WHERE sku = ${req.query.sku}`, (err, response) => {
//     if (err) {
//       console.log('err in server getting from db:', err);
//       res.end();
//     } else{
//       console.log('response in server from db:');
//       res.send(response.rows[0]);      
//     }
//   })
// })


// app.get('/product_info', (req, res) => {
//   db.query(`SELECT * FROM products WHERE sku = ${Math.floor(Math.random() * 50)}`, (err, response) => {
//     if (err) {
//       console.log('err in server getting from db:', err);
//       res.end();
//     } else{
//       console.log('response in server from db:', response);
//       res.send(response.rows[0]);      
//     }
//   })
// })

// const getAllItems = (callback) => {
//   client.query('SELECT * FROM inventory_items WHERE quantity > 0 ORDER BY datecreated desc', (err, data)=>{
//     if (err){
//       callback('Error! Unable to get data: ', err)
//     }
//     else {
//       callback(null, data)
//     }
//   })
// }

// const updateItemQuantity = (sku, quantity, callback) => {
//   client.query(
//     `UPDATE inventory_items SET datecreated = NOW() WHERE sku = ${sku} and quantity = 0;
//      UPDATE inventory_items SET quantity = ${quantity} WHERE sku = ${sku};`
//     , (err, data)=>{
//     if (err){
//       callback(err)
//     }
//     else {
//       callback(null, data)
//     }
//   })
// }

// // getAllItems();
// // updateItemQuantity(3, 100)

// module.exports = { getAllItems, updateItemQuantity };
