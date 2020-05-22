import Post from '../../models/post';
import mongoose from 'mongoose';
// Request Body 검증
import Joi from '@hapi/joi';

// ObjectId 검증
const { ObjectId } = mongoose.Types;
export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  // 올바른 id 값인지 검증한다.
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

/*
    POST /api/posts/
    {
        title : '제목',
        body:'내용',
        tags: ['태그 1', '태그 2']
    }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  });

  //검증 후 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET /api/posts/
export const list = async (ctx) => {
  // query는 문자열이기 때문에 숫자로 변환
  // 값이 주어지지 않았다면 1을 기본으로 사용.
  const page = parseInt(ctx.query.page || '1', 10);
  if (page < 1) {
    ctx.status = 400;
    return;
  }

  try {
    // sort -1 : 내림차순 정렬
    // limit(10) : 한번에 보이는 개수를 제한한다 (10개로 제한)
    // skip(10) : 처음 10개를 제외하고 그다음 데이터를 불러온다.
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean()
      .exec();
    // 마지막 페이지 번호 알려주기
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    //ctx.body = posts;
    // 내용 길이 제한 body의 길이가 200자 이상이면 뒤에 ...를 붙인다.
    ctx.body = posts.map(post => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

// GET /api/posts/:id
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // not found
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// DELETE /api/post/:id
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공은 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

// findByIdAndUpdate()는 세가지 파라미터
// 첫번째는 id , 두번째는 업데이트 내용, 세번째는 업데이트의 옵션
// PATCH /api/posts/:id
export const update = async (ctx) => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()), // 문자열로 이루어진 배열
  });

  //검증 후 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // true 면 업데이트된 데이터를 반환한다.
      // false면 업데이트되기 전의 데이터를 반환한다.
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
