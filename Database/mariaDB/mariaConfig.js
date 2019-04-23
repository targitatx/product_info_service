const mariadb = require('mariadb');
require('dotenv').config();
const pool = mariadb.createPool({
  host: process.env.MARIADB_HOST,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PW,
  database: process.env.MARIADB_DB
})

const findItemsSku = function(sku, callback) {
  pool.getConnection()
      .then(conn => {
        conn.query(`SELECT title, price, photo_url, product_description FROM products where sku = ${sku};`)
          .then((rows) => {
            console.log(rows[0]); 
            callback(null, rows);
          })
          .then(() => {
            conn.end();
          })
          .catch(err => {
            console.log(err); 
            conn.end();
          })
          
      }).catch(err => {
        if(err) {
          console.error(err);
        }
      });
}

const getSimilarImages = function(title, callback) {
  pool.getConnection()
      .then(conn => {
        conn.query(`SELECT photo_url FROM products WHERE title LIKE '%${title}' LIMIT 5`)
          .then((rows) => {
            console.log(rows[0]); 
            callback(null, rows);
          })
          .then(() => {
            conn.end();
          })
          .catch(err => {
            console.log(err); 
            conn.end();
          })
          
      }).catch(err => {
        if(err) {
          console.error(err);
        }
      });
}

module.exports = {findItemsSku, getSimilarImages};
// npm.command.run('mysql -u root -p < Database/mariaDB/mariaSchema.sql', (err1) => {
//   if (err) {
//     console.error(err);
//   } 
// });
// LOAD DATA INFILE 'Database/tonzOData.csv' INTO TABLE products FIELDS TERMINATED BY ',' IGNORE 1 LINES;
