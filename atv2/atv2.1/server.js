const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const readline = require('readline');

const readlineInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let client = {};

server.on('message', (data, rinfo) => {
	client = rinfo;
  console.log('Received data from client: ', data.toString());
});

server.on('listening', () => {
	readlineInterface.on('line', (input) => {
		if (client.port) {
			server.send(input, client.port, client.address);
		}
	});
});

server.bind(4000);
