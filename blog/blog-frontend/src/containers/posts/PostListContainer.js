import React, { useEffect } from 'react';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { listPosts } from '../../modules/posts';
import PostList from '../../components/post/PostList';
import { withRouter } from 'react-router-dom';

const PostListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );
  // https://velopert.com/3417 참고
  useEffect(() => {
    // params 의 경우엔 사용하기 전에 꼭 라우트에서 지정을 해주어야한다.
    // match.params (/about/:name)
    const { username } = match.params;
    // var x = location.search;
    // x => ?email=someone@example.com
    const { tag, page } = qs.parse(location.search, {
      // query 물음표 제거
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);
  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default withRouter(PostListContainer);
