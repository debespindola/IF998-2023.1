const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const operationsFuncs = {
	multiply: (a, b) => a * b,
	divide: (a, b) => a / b,
	sum: (a, b) => a + b,
	subtract: (a, b) => a - b
}

const operations = ['multiply', 'divide', 'sum', 'subtract'];

let client = {};


server.on('message', (data, rinfo) => {
	client = rinfo;
  const dataFromClient = data.toString();
	const [operation, a, b] = dataFromClient.split(' ');

	if (!operations.includes(operation)) {
		server.send('Invalid operation', client.port, client.address);
		return;
	}

	if (isNaN(a) || isNaN(b)) {
		server.send('Invalid numbers', client.port, client.address);
		return;
	}

	const result = operationsFuncs[operation](Number(a), Number(b));
	server.send(result.toString(), client.port, client.address);
});

server.bind(4000);
