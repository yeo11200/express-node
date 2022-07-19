import { SocketJoin } from '../../modules/socket';
import { SOCKET_JOIN, SOCKET_JOIN_EMIT } from '../../util/socket';

module.exports = (socket: any, io: any) => {
	// socket join에 대한 데이터
	socket.on(SOCKET_JOIN, (_join: SocketJoin) => {
		// token이 없을 때 소켓을 끊어버린다.
		if (!_join.token) {
			// socket을 끊는 함수
			socket.disconnect();
		}

		// room에 대한 데이터를 전달해준다.
		socket.join(_join.room);
		/**
		 * to: 방에 있는 사람들에게만 이벤트를 전달
		 * @param SOCKET_JOIN_EMIT : 소켓 이벤트
		 * @param room : romm 정보를 전달
		 */
		io.to(_join.room).emit(SOCKET_JOIN_EMIT, io.adapter.rooms);
	});
};
