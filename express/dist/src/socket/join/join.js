"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_1 = require("../../util/socket");
const redisClient = require('../../middleware/redis');
module.exports = (socket, io) => {
    // socket join에 대한 데이터
    socket.on(socket_1.SOCKET_JOIN, (_join) => {
        // token이 없을 때 소켓을 끊어버린다.
        if (!_join.token) {
            // socket을 끊는 함수
            socket.disconnect();
        }
        console.log(redisClient.get('ping', (err, data) => {
            console.log(data);
        }));
        // room에 대한 데이터를 전달해준다.
        socket.join(_join.room);
        /**
         * to: 방에 있는 사람들에게만 이벤트를 전달
         * @param SOCKET_JOIN_EMIT : 소켓 이벤트
         * @param room : romm 정보를 전달
         */
        io.to(_join.room).emit(socket_1.SOCKET_JOIN_EMIT, io.adapter.rooms);
    });
};
