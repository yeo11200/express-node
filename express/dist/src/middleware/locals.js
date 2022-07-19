"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageState = exports.localMessage = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
/**
 * 언어팩 설정
 * req에 cookie 값을 가지고 사용
 * req.cookies.locale이 없으면 ko로 기본 세팅
 * locale 데이터는
 *    - ko : 한국어
 *    - en : 영어
 *    - cn : 중국어
 */
/**
 * 언어팩 설정
 * @param _data { string | undefined } : 언어팩 설정 js 가져오기
 */
const localMessage = (_data) => {
    // app.get으로 전역으로 사용
    const locale = _data || 'ko';
    // 언어팩 설정 시 가져온다
    const a = require(`../util/${locale}.ts`);
    // APP 전역 함수 사용
    app.locals.locales = a;
};
exports.localMessage = localMessage;
/**
 * 언어팩 관련해서 리턴 data 사용
 * @param _key { string } : 언어팩 키 값
 * @returns { string }
 */
const messageState = (_key) => {
    const key = _key;
    if (!app.locals.locales) {
        return;
    }
    // APP 전역함수 가져오기
    return app.locals.locales.default[key];
};
exports.messageState = messageState;
