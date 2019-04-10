const express = require('express');
const path = require('path');
const cors = require('cors')
// const db = require('./db/config.js');
const { getCurrentProduct, getRelatedImages } = require('./db/db_helpers.js');
// const env = require('dotenv').config(); <<<< NEED TO IMPLEMENT THIS

const port = process.env.PORT || 3003;

const app = express();

// app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static('./dist'));


app.get('/product_info', (req, res) => {
  console.log('HHEYYYY')
  let sku = req.query.sku;
  getCurrentProduct(sku, (err, response) => {
    if (err) {
      console.log('error getting current product in server:', err);
      res.end();
    } else {
      res.send(response.rows);
    }
  })
})

app.get('/images', (req, res) => {
  let title = req.query.title;
  getRelatedImages(title, (err, response) => {
    if (err) {
      console.log('error getting images in server:', err);
      res.end();
    } else {
      res.send(response.rows);
    }
  })
})


app.listen(port, () => {
  console.log(`APP IS LISTENING TO SERVE YOUR NEEDS at ${port}`)
});




