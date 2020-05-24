//const Router = require('koa-router');
//const posts = require('./posts');
import Router from 'koa-router';
import posts from './posts/index';
import auth from './auth/index';

const api = new Router();

api.use('/posts', posts.routes());
api.use('/auth',auth.routes())

// 라우터를 내보낸다.
//module.exports = api;
export default api;