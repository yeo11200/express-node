import * as socketIo from 'socket.io';
const join = require('./join/join');

module.exports = (server: any) => {
	const io = new socketIo.Server(server, {
		path: '/socket.io',
		cors: { origin: '*' },
	});

	// path는 클라이언트와 연결할 수 있는 경로를 의미

	io.on('connection', (socket: any) => {
		console.log('a user connected');

		socket.on('init', function (data: { name: string }) {
			socket.emit('welcome', `hello! ${data.name}`);
		});

		join(socket, io);
	});
};
