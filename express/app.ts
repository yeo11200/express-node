import { NextFunction, Request, Response } from 'express';
import { localMessage } from './src/middleware/locals';

// express 전용 가지고오기
const express = require('express');

const http = require('http');

// express를 함축시켜서 변수화
const app = express();

// sequelize 사용 함수
const sequelize = require('./models');

// CORS 에러에 대한 설정
const cors = require('cors');

// HTTP 데이터를 전달
const bodyPaser = require('body-parser');

// cookie를 사용하기 쉽게 하기 위한 라이브러리 세팅
const cookieParser = require('cookie-parser');

// env 설정을 가져오기 위한 아이
require('dotenv/config');

const router = require('./src/route');

// const redis = require('./src/middleware/redis');
const redis = require('redis');
/* App  Global Variable S */

// 시스템에 포트가 있다면 포트 사용 아니면 3000 포트
// app set으로 넣으면 key값과 같이 데이터를 넣어주고, get으로 데이터를 받아온다.
app.set('port', process.env.PORT || 4000);

/* App  Global Variable E */

/* Application middleware S */

app.use(cors());

app.use(bodyPaser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(function (req: Request, res: Response, next: NextFunction) {
	// 쿠키에 있는 데이터를 사용한다.
	const locales = req.cookies.locales || 'ko';

	localMessage(locales);
	next();
});
// Router 설정
app.use(router);

// Redis Port 6379이거나 지정된 레디스 포트를 사용한다.
const redisPort: number = Number(process.env.REDIS_PORT) || 6379;

console.log(redisPort);

const client = redis.createClient(redisPort);

(async () => {
	await client.connect();
})();

global.redis = client;

(async () => {
	await global.redis.set('aaa2', 'test333');
})();
// 레디스 연동 미들웨어
// app.use(redis.redisClient);
global.redis.get('aaa2', (err, reply) => {
	console.log(reply); // zerocho
});
/* Application middleware E */

const server = http.createServer(app);

server.listen(app.get('port'), () => {
	console.log(`Example app listening on port ${app.get('port')}!`);

	/**
	 * DB 연결
	 * APP 리슨이 되면 연결 까지 시킨다
	 */
	// sequelize.sequelize.authenticate().then(() => {
	//   console.log("connection success");
	// })
	// .catch((e: any) => {
	//     console.log('TT : ', e);
	// })
});

// 소켓연동을 하기 위한 데이터
require('./src/socket/socket')(server);
