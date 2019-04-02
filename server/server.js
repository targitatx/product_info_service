const express = require('express');
const path = require('path');
const db = require('./db/config.js');
// const env = require('dotenv').config(); <<<< NEED TO IMPLEMENT THIS

const port = process.env.PORT || 3003;

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/product_info', (req, res) => {
  db.query(`SELECT * FROM products WHERE sku = ${Math.floor(Math.random() * 50)}`, (err, response) => {
    if (err) {
      console.log('err in server getting from db:', err);
      res.end();
    } else{
      console.log('response in server from db:', response);
      res.send(response.rows[0]);      
    }
  })
})


app.listen(port, () => {
  console.log(`APP IS LISTENING TO SERVE YOUR NEEDS at http://localhost:${port}`)
});