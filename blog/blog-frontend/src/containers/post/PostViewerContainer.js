import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readPost, unloadPost } from '../../modules/post';
import PostViewer from '../../components/post/PostViewer';
import { withRouter } from 'react-router-dom';
import PostActionButton from '../../components/post/PostActionButton';
import { setOriginalPost } from '../../modules/write';
import { removePost } from '../../lib/api/posts';

const PostViewerContainer = ({ match, history }) => {
  // 처음 마운트될 때 포스트 읽기 API 요청
  const { postId } = match.params;
  const dispatch = useDispatch();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      user: user.user,
    }),
  );

  useEffect(() => {
    dispatch(readPost(postId));
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  //포스트 수정 페이지로 이동(작성페이지)
  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push('/write');
  };
  // 포스트 삭제
  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push('/'); // 삭제후 홈으로 이동
    } catch (e) {
      console.log(e);
    }
  };

  // 포스트의 작성자와 현재 로그인된 유저 id 비교
  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer
      post={post}
      loading={loading}
      error={error}
      actionButtons={
        ownPost && <PostActionButton onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default withRouter(PostViewerContainer);
