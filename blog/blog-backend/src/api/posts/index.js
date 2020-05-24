//const Router = require('koa-router');
//const postsCtrl = require('./posts.ctrl');
import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn ,postsCtrl.write);

// posts.get('/:id', postsCtrl.checkObjectId ,postsCtrl.read);
// posts.delete('/:id', postsCtrl.checkObjectId,postsCtrl.remove);
// // 데이터를 새 정보로 통째로 교체할 때 사용
// // posts.put('/:id', postsCtrl.replace);
// // 데이터의 특정 필드를 수정할 때 사용
// posts.patch('/:id', postsCtrl.checkObjectId ,postsCtrl.update);
// 리팩토링
const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);
// posts에 해당 라우터 등록
posts.use('/:id', postsCtrl.getPostById, post.routes());

//module.exports = post;
export default posts