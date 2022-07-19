# Express + Typescript

# Typescript 설치

```shell
npm install -g typescript
npm install -d typescript
tsc --init
```

### typescript 설정시 에러 발생

- 해당하는 에러는 터미널에 스크립트 권한 에러가 나는 경우 발생
- Visual Studio Code or Intellij 관리자 권한 실행

```shell
Get-ExecutionPolicy

Set-ExecutionPolicy RemoteSigned
```

### express 설치

- express는 node 기반에 javascript 서버용 프레임워크
- express nest.js 두개의 서버 용 프레임워크가 있지만, express가 조금 더 현재까지 사용성이 좋다.

```shell
npm install --save express

# typescript 전용
npm install -d @types/express
```

### Perttie - 소스를 모든 사람들이 맞춰나갈 수 있게 세팅

```shell
npm i --save-dev eslint-config-prettier eslint-plugin-prettier prettier
```

### ESlint 설정

- lint 설정으로 코드 컨벤션 맞춤

```shell
npm install --save-dev eslint
npx eslint --init
```

### 미들웨어

- 미들웨어란
  - 요청, 응답 도중에 미들웨어로 엑세스 권한을 주거나 가져갈 수 있다.
  - 중간에서 그 목적에 맞게 처리를 하는 함수

```js
const a = (req, res, next) => {
	if (req) {
		return err;
	}

	next();
};
/**
 * 미들 웨어 사용은 use
 * app.use를 사용하면 어플리케이션 레벨
 */
app.use(a);

/**
 * 미들 웨어 해당하는 객체 사이에 사용
 * 라우터 레벨
 */
app.get('/', a, function (req, res) {
	res.send('Hello World!');
});
```

### 폴더 소개

- util : 모든 프로젝트에서 공통 함수나 모듈로 사용
- common : 프로젝트에서 공통 변수나 공통 데이터
- service : 비지니스 모델
- controller : controller에 대한 설정
- route : route에 대한 설정
- types : Type 정의
- swagger : swagger 전용
- config : 디비 정보 및 외부 라이브러리 정보 전용
- models : DB에 대한 model
- seeders : 테스트용 데이터를 넣기 전용
- middleware : 미들웨어 전용
- locale : 다중 언어팩 설정

### 기본적인세팅

```shell
npm install body-parser // post data를 받기위한 라이브러리
npm install cookie-parser // 요청된 쿠키를 쉽게 추출할 수 있게 해주는 라이브러리
npm install cors // CORS를 허용할 라이브러리
npm install compression // 압축된 API를 보내고, 압축된 API를 받는다.
npm install morgan fs // logger 전용 문서
npm install jsonwebtoken // JWT 인증 토큰
npm install --save-dev @types/jsonwebtoken // JWT type token
npm install --save express-validator // express 전용 validator 체크
```

### ORM

- ORM은 객체 관계 매핑이라고해서 해당하는 객체들이 관계형 DB 데이터를 자동으로 매핑되는것을 말한다.
- ORM 중에는 sequelize와 typeORM이 있는데 이번 프로젝트에는 sequelize를 사용할 것이다
- 사유
  - sequelize : functional에 최적화
  - typeORM : 클래스 형에 최적화 <br>
    이번 프로젝트는 function으로 사용할 것이 떄문에 sequelize를 사용

```shell
npm install --save mysql2 reflect-metadata sequelize sequelize-cli

npx sequelize-cli init // 자동으로 config, models, migration, seeders 생성
```

### Socket

```shell
npm install --save socket-io
npm i --save @types/socket.io

### npm install ws websocket을 원하면 이 npm을 설치
```

### Bcrypt를 통한 암호화

```shell
npm install --save bcrypt
```

### Error Code

```js
401 : access token 만료
402 : refresh token 만료
419 : 유효하지 않은 access token
420 : 유효하지 않은 refresh token
500 : data 에러
```

### Redis
