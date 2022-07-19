import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import { secretKey } from '../../config/config';
import { fail } from '../util';
import { ERROR_CODE, ERROR_MSG } from '../util/error';

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
const verifyRefreshToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.headers.authorization) {
		return res.json(fail(ERROR_CODE.BAD_REQUEST, ERROR_MSG.BAD_REQUEST));
	} else {
		try {
			// refresh token으로 들어와서 해당 token으로 데이터를 가지고 와서 다시 access token으로 갱신
			const data = JWT.verify(
				req.headers.authorization.replace('Bearer ', ''),
				secretKey
			);

			res.locals.assetsToken = JWT.sign(
				{ sub: 'access', data: data },
				secretKey,
				{ expiresIn: '30m' }
			);
		} catch (e) {
			// 토큰이 만료가 될 경우
			if (e === 'TokenExpiredError') {
				return res.json(
					fail(ERROR_CODE.REFRESHTOKENEXPIRED, ERROR_MSG.REFRESHTOKENEXPIRED)
				);
			}

			// 토큰이 유효하지않을 경우
			return res.json(
				fail(ERROR_CODE.REFRESHTOKENINVALID, ERROR_MSG.REFRESHTOKENINVALID)
			);
		}
	}

	next();
};

/**
 * token 검증
 * 419가 될 경우 verifyRefreshToken 함수 호출
 */
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		return res.json(fail(ERROR_CODE.BAD_REQUEST, ERROR_MSG.BAD_REQUEST));
	} else {
		try {
			// verify : JWT 데이터를 가지고 올 때 사용
			const data = JWT.verify(
				req.headers.authorization.replace('Bearer ', ''),
				secretKey
			);

			// res.locals : 해당 스코프에 데이터를 사용
			res.locals.info = data;
		} catch (e) {
			// 토큰이 만료가 될 경우
			if (e === 'TokenExpiredError') {
				return res.json(
					fail(ERROR_CODE.ACCESSTOKENEXPIRED, ERROR_MSG.ACCESSTOKENEXPIRED)
				);
			}

			// 토큰이 유효하지않을 경우
			return res.json(
				fail(ERROR_CODE.ACCESSTOKENINVALID, ERROR_MSG.ACCESSTOKENINVALID)
			);
		}
	}

	next();
};

/**
 * token update
 * @param data { any }
 * @return { assetsToken: string, refreshToken: string }
 */
const signToken = (data: any) => {
	const res: {
		assetsToken: string;
		refreshToken: string;
	} = {
		assetsToken: '',
		refreshToken: '',
	};

	// sign : JWT를 등록할 때 사용
	res.assetsToken = JWT.sign({ sub: 'access', data: data }, secretKey, {
		expiresIn: '30m',
	});
	res.refreshToken = JWT.sign({ sub: 'refresh', data: data }, secretKey, {
		expiresIn: '24h',
	});

	return res;
};

/**
 * refresh token update
 * verifyRefreshToken 함수를 타면 refresh update
 */
const signRefreshToken = (data: any) => {
	const res: { refreshToken: string } = { refreshToken: '' };

	res.refreshToken = JWT.sign({ sub: 'refresh', data: data }, secretKey, {
		expiresIn: '24h',
	});

	return res;
};

module.exports = {
	verifyRefreshToken,
	verifyToken,
	signToken,
	signRefreshToken,
};
