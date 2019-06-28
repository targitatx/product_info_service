const faker = require('faker');
const fs = require('fs');
const path = require('path');

const generatedData = fs.createWriteStream("./Database/tonzOData.csv");

for (let x = 0; x < 10000000; x++) {
  generatedData.write(`${x + 1},${faker.commerce.productName()},${faker.commerce.price()},${faker.image.cats()},${faker.lorem.sentence()} \n`);
}
