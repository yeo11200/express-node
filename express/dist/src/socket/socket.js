"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = __importStar(require("socket.io"));
const join = require('./join/join');
module.exports = (server) => {
    const io = new socketIo.Server(server, {
        path: '/socket.io',
        cors: { origin: '*' },
    });
    // path는 클라이언트와 연결할 수 있는 경로를 의미
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('init', function (data) {
            socket.emit('welcome', `hello! ${data.name}`);
        });
        join(socket, io);
    });
};
