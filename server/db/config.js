const { Client } = require('pg');

const client = new Client({
  host: 'postgres.cgfugiszbs9s.us-east-2.rds.amazonaws.com',
  port: 5432,
  user: 'maggie',
  database: 'postgres',
  password: 'mypassword'
})
client.connect((err, success) => {
  if (err) {
    console.log('error connecting to online db:', err)
  } else {
    console.log('success connecting to online db!');
  }
})

module.exports = client;

