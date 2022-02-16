import { NextFunction, Request, Response } from "express";
import { localMessage } from './src/middleware/locals';

// express 전용 가지고오기
const express = require('express');

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

require('dotenv/config');

const router = require('./src/route');

/* Application middleware S */

// 시스템에 포트가 있다면 포트 사용 아니면 3000 포트
// app set으로 넣으면 key값과 같이 데이터를 넣어주고, get으로 데이터를 받아온다.
app.set('port', process.env.PORT || 3000);

app.use(cors());

app.use(bodyPaser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(function(req: Request,res: Response, next: NextFunction){
  const locales = req.cookies.locales || 'ko';

  localMessage(locales);
  next();
});
// Router 설정
app.use(router);

/* Application middleware E */

app.listen(app.get('port'), () => {
  console.log(`Example app listening on port ${app.get('port')}!`);

  /**
   * DB 연결 
   * APP 리슨이 되면 연결 까지 시킨다
   */
  sequelize.sequelize.authenticate().then(() => {
    console.log("connection success");
  })
  .catch((e: any) => {
      console.log('TT : ', e);
  })
});