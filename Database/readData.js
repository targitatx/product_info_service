const fs = require('fs');
const readline = require('readline');

let rl = readline.createInterface({
    input: fs.createReadStream('./Database/tonzOData.csv')
});

let line_no = 0;
rl.on('line', function(line) {
    line_no++;
    // console.log(line);
});
rl.on('close', function(line) {
    console.log('We made it');
});

// const readData = fs.createReadStream('./Database/tonzOData.csv');
// readData.setEncoding('UTF8')
// readData 
//   .on('data', (chunk) => {
//     console.log("Start", chunk);
//   })
//   .on('end', () => {
//     console.log('FINISHED')
//   })