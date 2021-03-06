let postId = 1; // id 의 초깃값이다.

// posts 배열 초기 데이터
const posts = [
  {
    id: 1,
    title: '제목',
    body: '내용',
  },
];

// 포스트 작성 POST /api/posts {title,body}
// exports 코드
// exports.write = ctx => {
//     // Rest API Request Body는  ctx.request.body에서 조회할 수 있다.
//     const {title,body} = ctx.request.body;
//     postId += 1; // 기존 ID에 1을 더한다.
//     const post = {id : postId, title ,body};
//     posts.push(post);
//     ctx.body =post;
// }
// export const ES Module 형태로 바꾸기
export const write = ctx => {
    // Rest API Request Body는  ctx.request.body에서 조회할 수 있다.
    const {title,body} = ctx.request.body;
    postId += 1; // 기존 ID에 1을 더한다.
    const post = {id : postId, title ,body};
    posts.push(post);
    ctx.body =post;
}

// 포스트 목록 조회 GET /api/posts
export const list = ctx => {
    ctx.body = posts;
}

// 특정 포스트 조회 GET /api/posts/:id
export const read = ctx => {
    const {id} = ctx.params;
    // 주어진 id 값으로 포스트를 찾는다.
    // 파라미터로 받아 온 값은 문자열이므로 숫자로 변환하거나 비교할 id 값을 문자열로 변경한다.
    const post = posts.find(p => p.id.toString() === id);
    // 없으면 오류반환
    if(!post){
        ctx.status = 404;
        ctx.body = {
            message : '해당 포스트가 존재하지 않습니다.'
        };
        return;
    }
    ctx.body = post;
};

// 특정 포스트 제거 DELETE /api/posts/:id
export const remove = ctx => {
    const {id} = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);
    // 포스트 없으면 오류 반환
    if(index === -1){
        ctx.status = 404;
        ctx.body ={
            message : '해당 포스트가 존재하지 않습니다.'
        };
        return;
    }
    // index 에 해당하는 아이템 제거
    posts.splice(index,1);
    ctx.status = 204; // No Content
};

// 포스트 수정 put /api/post/:id {title,body}
export const replace = ctx => {
    // PUT 메서드는 전체 포스트 정보를 입력하여 데이터를 통쨰로 교차할 때 사용한다.
    const {id} = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message : '해당 포스트가 존재하지 않습니다.'
        };
        return;
    }
    // 전체 객체를 덮어 씌운다.
    // 따라서 id를 제외한 기존 정보를 날리고 객체를 새로 만든다.
    posts[index] = {
        id,
        ...ctx.request.body
    };
    ctx.body = posts[index];
}

// 포스트 수정(특정 필드 변경) PATCH /api/posts/:id {title , body}
export const update = ctx => {
    // patch 메서드는 주어진 필드만 교체한다.
    const {id} = ctx.params;
    const index = posts.findIndex(p => p.id.toString() === id);
    if(index === -1){
        ctx.status = 404;
        ctx.body = {
            message : '해당 포스트가 존재하지 않습니다.'
        };
        return;
    }
    // 기존 값에 정보를 덮어 씌운다.
    posts[index] = {
        ...posts[index],
        ...ctx.request.body,
    };
    ctx.body = posts[index];
}