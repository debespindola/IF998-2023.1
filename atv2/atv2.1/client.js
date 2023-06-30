const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const readline = require('readline');

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('message', (data) => {
  console.log('Received data from server: ', data.toString());
})


readlineInterface.on('line', (input) => {
  client.send(input, 4000, '127.0.0.1');
});
