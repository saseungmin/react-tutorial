# ✔ mongoose를 이용한 MongoDB 연동
- MongoDB는 문서 지향적 NoSQL 데이터베이스.
- 새로운 무서를 만들면 <code>_id</code>라는 고윳값을 자동으로 생성한다.
- <code>_id</code> 값은 시간, 머신 아이디, 프로세스 아이디, 순차 번호로 되어 있어 값의 고유함을 보장한다.
<pre>
{
    "_id": "5ec75011152e9647e89c19b7", => ObjectId
    "username" : "seungmin",
    "name" : {first : "seungmin", last : "sa"}
}
</pre>

> - 📌 MongoDB 참조 문서 : https://docs.mongodb.com/manual/
> - 📌 MongoDB 설치 : https://www.mongodb.com/download-center/community
- MongoDB 설치 확인
<pre>
$ cd C:\Program Files\MongoDB\Server\4.2\bin
$ mongo
$ version()
</pre>

## ✒ mongoose 설치 및 적용
- <code>mongoose</code>는 Node.js 환경에서 사용하는 MongoDB 기반 ODM(Object Data Modelling) 라이브러리이다.
- 이 라이브러리는 데이터베이스 문서들을 자바스크립트 객체처럼 사용할 수 있게 해준다.
- <code>dotenv</code>는 환경변수들을 파일에 넣고 사용할 수 있게 하는 개발 도구이다.
- 환경변수 파일은 <code>.gitignore</code>를 작성 후 제외시켜야한다.
- <code>mongoose</code>를 이용하여 서버와 데이터베이스를 연결한다.
<pre>
$ yarn add mongoose dotenv

// dotenv를 불러와서 config() 함수를 호출해 process.env로 조회할 수 있다.
require('dotenv').config();
const mongoose = require('mongoose');
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

// 포드가 지정되어 있지 않으면 4000번 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
</pre>

## ✒ esm으로 ES모듈 import/export 문법 사용하기
- Node.js에서는 아직 정식으로 ES모듈 import/export를 지원하지 않는다.
- 사용할려면 확장자를 <code>.mjs</code>로 사용하고 node를 실행할 때 <code>--experimental-modules</code>라는 옵션을 넣어 주어야한다.
- 때문에 esm이라는 라이브러리를 사용하여 변경.
<pre>
$ yarn add esm
</pre>
- 기존 src/index.js를 main.js로 변경하고 index.js 파일 새로 생성
<pre>
// no-global-assign ESLint 옵션 비활성화하기
/* eslint-disable no-global-assign */

require = require('esm')(module /*, options*/);
module.exports = require('./main.js');
</pre>

- package.json - scripts 부분 수정
<pre>
  "scripts": {
    "start": "node -r esm src",
    "start:dev": "nodemon --watch src/ -r esm src/index.js"
  }
</pre>

- ESLint 에서 import/export 구문을 사용해도 오류로 간주하지 않도록 .eslintrc.json 수정
<pre>
"parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
},
</pre>
- 기존 코드 ES Module 형태로 변경하기(소스코드 참고)
- jsconfig.json 루트 디렉터리에 작성 (자동 완성을 통해 모듈을 불러올 수 있다.)
<pre>
{
    "compilerOptions": {
        "target": "es6",
        "module": "es2015"
    },
    "include": ["src/**/*"]
}
</pre>

## ✒ 스키마와 모델
- <b>스키마</b>는 컬렉션에 들어가는 문서 내부의 각 필드가 어떤 형식으로 되어 있는지 정의하는 객체이다.
- <b>모델</b>은 스키마를 사용하여 만드는 인스턴스로, 데이터베이스에서 실제 작업을 처리할 수 있는 함수들을 지니고 있는 객체이다.
### 🔸 스키마 및 모델 생성
- src/models/post.js 생성
<pre>
import mongoose from "mongoose";

const {Schema} = mongoose;
//스키마
const PostSchema = new Schema({
    title : String,
    body : String,
    tags : [String],
    publishedDate : {
        type : Date,
        default : Date.now, // 기본값을 현재 날짜로 지정
    }
})

// 모델 
const Post = mongoose.model('Post',PostSchema);
export default Post;
</pre>
- <code>model()</code> 함수는 기본적으로 두 개의 파라미터가 필요하다.
- 첫 번째 파라미터는 스키마 이름이고, 두 번째 파라미터는 스키마 객체이다.
- 스키마 이름을 정해 주면 그이름의 복수 형태로 데이터베이스에 컬렉션 이름을 만든다. (Post => posts)
- 위와 같은 권장되는 규칙을 따르고 싶지 않다면, 세 번째 파라미터에 원하는 이름을 넣어주면 된다.
