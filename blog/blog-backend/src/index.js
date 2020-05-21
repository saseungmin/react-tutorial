const Koa = require('koa');
const Router = require('koa-router');
// Router를 적용하는 코드의 윗부분에서 해야한다.
const bodyParser = require('koa-bodyparser');

const api = require('./api');

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
// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
  console.log('Listening to port 4000');
});
