import { NextFunction, Request, Response } from 'express';
const redis = require('redis');

const redisClient = (req: Request, res: Response, next: NextFunction) => {
	console.log('aaaa');

	// Redis Port 6379이거나 지정된 레디스 포트를 사용한다.
	const redisPort: number = Number(process.env.REDIS_PORT) || 6379;

	console.log(redisPort);

	const client = redis.createClient(redisPort);

	(async () => {
		await client.connect();
	})();

	global.redis = client;

	global.redis.on('connect', () => console.log('Redis Client Connected'));
	global.redis.on('error', err =>
		console.log('Redis Client Connection Error', err)
	);

	global.redis.set('aaa', 'test');

	next();
};

module.exports = { redisClient };
