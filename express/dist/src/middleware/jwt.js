"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config/config");
const util_1 = require("../util");
const error_1 = require("../util/error");
/**
 * 토큰 업데이트 순서
 * signToken -> access, refresh를 업데이트
 * access : 30분, refresh : 하루
 * verifyToken -> 토큰 여부를 판단
 * verifyRefreshToken -> access 토큰이 만료가 되면 탐
 *    - refresh을 사용 30분 연장
 *    - sigRefreshnToken를 사용해서 refreshToken 연장
 *
 * 로그아웃이 되는 시점은 하루동안 사용자가 사용을 안하면 로그아웃
 */
/**
 * access Token update
 * req.headers.authorization -> refreshToken
 * 토큰이 만료될 경우 refresh 토큰 사용
 * access -> refresh 사용
 * refresh 업데이트
 */
const verifyRefreshToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json((0, util_1.fail)(error_1.ERROR_CODE.BAD_REQUEST, error_1.ERROR_MSG.BAD_REQUEST));
    }
    else {
        try {
            // refresh token으로 들어와서 해당 token으로 데이터를 가지고 와서 다시 access token으로 갱신
            const data = jsonwebtoken_1.default.verify(req.headers.authorization.replace("Bearer ", ""), config_1.secretKey);
            res.locals.assetsToken = jsonwebtoken_1.default.sign({ sub: 'access', data: data }, config_1.secretKey, { expiresIn: '30m' });
        }
        catch (e) {
            // 토큰이 만료가 될 경우
            if (e === 'TokenExpiredError') {
                return res.json((0, util_1.fail)(error_1.ERROR_CODE.REFRESHTOKENEXPIRED, error_1.ERROR_MSG.REFRESHTOKENEXPIRED));
            }
            // 토큰이 유효하지않을 경우
            return res.json((0, util_1.fail)(error_1.ERROR_CODE.REFRESHTOKENINVALID, error_1.ERROR_MSG.REFRESHTOKENINVALID));
        }
    }
    next();
};
/**
 * token 검증
 * 419가 될 경우 verifyRefreshToken 함수 호출
 */
const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.json((0, util_1.fail)(error_1.ERROR_CODE.BAD_REQUEST, error_1.ERROR_MSG.BAD_REQUEST));
    }
    else {
        try {
            // verify : JWT 데이터를 가지고 올 때 사용 
            const data = jsonwebtoken_1.default.verify(req.headers.authorization.replace("Bearer ", ""), config_1.secretKey);
            // res.locals : 해당 스코프에 데이터를 사용
            res.locals.info = data;
        }
        catch (e) {
            // 토큰이 만료가 될 경우
            if (e === 'TokenExpiredError') {
                return res.json((0, util_1.fail)(error_1.ERROR_CODE.ACCESSTOKENEXPIRED, error_1.ERROR_MSG.ACCESSTOKENEXPIRED));
            }
            // 토큰이 유효하지않을 경우
            return res.json((0, util_1.fail)(error_1.ERROR_CODE.ACCESSTOKENINVALID, error_1.ERROR_MSG.ACCESSTOKENINVALID));
        }
    }
    next();
};
/**
 * token update
 * @param data { any }
 * @return { assetsToken: string, refreshToken: string }
 */
const signToken = (data) => {
    const res = {
        assetsToken: '',
        refreshToken: ''
    };
    // sign : JWT를 등록할 때 사용
    res.assetsToken = jsonwebtoken_1.default.sign({ sub: 'access', data: data }, config_1.secretKey, { expiresIn: '30m' });
    res.refreshToken = jsonwebtoken_1.default.sign({ sub: 'refresh', data: data }, config_1.secretKey, { expiresIn: '24h' });
    return res;
};
/**
 * refresh token update
 * verifyRefreshToken 함수를 타면 refresh update
 */
const signRefreshToken = (data) => {
    const res = { refreshToken: '' };
    res.refreshToken = jsonwebtoken_1.default.sign({ sub: 'refresh', data: data }, config_1.secretKey, { expiresIn: '24h' });
    return res;
};
module.exports = {
    verifyRefreshToken,
    verifyToken,
    signToken,
    signRefreshToken
};
