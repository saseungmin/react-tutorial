const Router = require('koa-router');
const postsCtrl = require('./posts.ctrl');
const post = new Router();

post.get('/', postsCtrl.list);
post.post('/', postsCtrl.write);
post.get('/:id', postsCtrl.read);
post.delete('/:id', postsCtrl.remove);
// 데이터를 새 정보로 통째로 교체할 때 사용
post.put('/:id', postsCtrl.replace);
// 데이터의 특정 필드를 수정할 때 사용
post.patch('/:id', postsCtrl.update);
module.exports = post;
