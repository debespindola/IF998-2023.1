const net = require('net');
const readline = require('readline');

const readlineInterface = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const handleConnection = (socket) => {
	console.log('New connection');

	socket.on('end', () => {
		console.log('Connection closed');
	})

	socket.on('data', (data) => {
		const dataFromClient = data.toString();

		if (dataFromClient === 'exit') {
			socket.end();
		}

		console.log('Received data from client: ', dataFromClient);
	})

	readlineInterface.addListener('line', (line) => {
		socket.write(line);
	})
}

const server = net.createServer(handleConnection);
server.listen(4000, '127.0.0.1');

