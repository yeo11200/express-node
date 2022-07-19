import express from 'express';

const app = express();

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
export const localMessage = (_data?: string) => {
	// app.get으로 전역으로 사용
	const locale = _data || 'ko';

	// 언어팩 설정 시 가져온다
	const lang = require(`../util/${locale}.ts`);

	// APP 전역 함수 사용
	app.locals.locales = lang;
};

/**
 * 언어팩 관련해서 리턴 data 사용
 * @param _key { string } : 언어팩 키 값
 * @returns { string }
 */
export const messageState = (_key: string) => {
	const key = _key;

	if (!app.locals.locales) {
		return;
	}

	// APP 전역함수 가져오기
	return app.locals.locales.default[key];
};
