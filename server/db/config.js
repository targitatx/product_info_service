const { Client } = require('pg');

const client = new Client({
  database: 'product_info',
})
client.connect()

module.exports = client;
