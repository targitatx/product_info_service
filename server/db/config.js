// const { Client } = require('pg')
// const client = new Client()

// client.connect()

// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// });

const { Client } = require('pg');

// const pool = new Pool({
//   user: 'Maggie',
//   host: 'http://localhost',
//   database: 'product_info',
//   port: 1433
// })

// pool.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   pool.end()
// })

const client = new Client({
  database: 'product_info',
})
client.connect()

module.exports = client;

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })