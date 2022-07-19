"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fnRedisConnect = exports.fail = void 0;
/**
 * 에러코드를 관리하는 곳
 * @param code { number }
 * @param message { string }
 * @returns
 */
const fail = (_code, _message) => {
    return {
        status: _code,
        message: _message,
    };
};
exports.fail = fail;
/**
 * 레디스를 연결해서 전역 변수로 사용
 * @param _redis { function } : 레디스 연결
 * @returns
 */
const fnRedisConnect = (_redis) => {
    return _redis;
};
exports.fnRedisConnect = fnRedisConnect;
