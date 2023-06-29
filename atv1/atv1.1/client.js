const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.connect(4000, '127.0.0.1', () => {
  console.log('Connected to the server');

  readlineInterface.addListener('line', (line) => {
    client.write(line);
  }); 

  client.on('data', (data) => {
    const dataFromServer = data.toString();
    console.log('Received data from server: ', dataFromServer);
  });
})