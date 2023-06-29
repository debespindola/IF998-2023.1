const net = require('net');

// type User = {
// 	name: string,
// 	socket: net.Socket
// }

const users = [];

const handleConnection = (socket) => {
	console.log('New connection from: ', socket.remoteAddress, socket.remotePort);
	users.push({
		name: '',
		socket
	});

	socket.write('Welcome to the chat!\n');
	socket.write('Please, enter your name: ');

	socket.on('end', () => {
		console.log('Connection closed from: ', socket.remoteAddress, socket.remotePort);
	})

	socket.on('data', (data) => {
		const dataFromClient = data.toString();

		if (dataFromClient === 'exit') {
			socket.end();
		}
		
		const user = users.find((user) => user.socket.remotePort === socket.remotePort);
		if (user.name === '') {
			user.name = dataFromClient;
			socket.write(`Welcome ${user.name}!\n`);

			return;
		}
		
		const sender = users.find((user) => user.socket.remotePort === socket.remotePort);
		users.forEach((user) => {
			user.socket.write(`${sender.name}: ${dataFromClient}`);
		});
	})
}

const server = net.createServer(handleConnection);
server.listen(4000, '127.0.0.1');

