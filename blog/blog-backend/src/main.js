require('dotenv').config();
// const Koa = require('koa');
// const Router = require('koa-router');
// // Router를 적용하는 코드의 윗부분에서 해야한다.
// const bodyParser = require('koa-bodyparser');
// const mongoose = require('mongoose');
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

//const api = require('./api');
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
//import createFakeData from './createFakeData';

// 비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
const { PORT, MONGO_URI } = process.env;

// mongoose를 이요해 서버와 데이터베이스와 연결
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
    //createFakeData();
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

// ctx : 웹 요청과 응답에 관한 정보
// next : 현재 처리 중인 미들웨어의 다음 미들웨어를 호출하는 함수
// 미들웨어를 등록하고 next 함수를 호출하지 않으면, 그다음 미들웨어을 처리하지 않는다.
// authorized == 1이라는 쿼리 파라미터가 포함되어 있으면 이후 미들웨어는 처리해주고 그렇지 않으면 이후 미들웨어는 처리하지 않는다.
// 쿼리 파라미터는 문자열이다.
// app.use(async (ctx, next) => {
//   console.log(ctx.url);
//   console.log(1);
//   if (ctx.query.authorized !== '1') {
//     ctx.status = 401; //Unauthorized
//     return;
//   }
//   // next는 Promise를 반환한다.
//   //   next().then(() => {
//   //     console.log('END');
//   //   });
//   // Koa는 async/await를 정식으로 지원한다.
//   await next();
//   console.log('END');
// });

// app.use((ctx, next) => {
//   console.log(2);
//   next();
// });

// app.use((ctx) => {
//   ctx.body = 'hello world';
// });

// 라우터 설정
// 첫번째 파라미터에는 경로를 넣고 두번째 파라미터에는 해당 라우터에 적용할 미들웨어 함수를 넣는다.
router.get('/', (ctx) => {
  ctx.body = '홈';
});

// http://localhost:4000/about/react
router.get('/about/:name', (ctx) => {
  const { name } = ctx.params;
  // name의 존재 유무에 따라 다른 결과 출력
  ctx.body = name ? `${name}의 소개` : '소개';
});

// http://localhost:4000/posts?id=승민
router.get('/posts', (ctx) => {
  const { id } = ctx.query;
  // id의 존재 유무에 따라 다른 결과 출력
  ctx.body = id ? `포스트 #${id}` : '포스트 아이디가 없습니다.';
});

router.use('/api', api.routes()); //api 라우트 적용
// 라우터 적용전에 bodyParser 적용
app.use(bodyParser());
// 토큰 검증 미들웨어 적용 app에 router 미들웨어를 적용하기 전에 이루어져야 한다.
app.use(jwtMiddleware);
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// 포드가 지정되어 있지 않으면 4000번 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
