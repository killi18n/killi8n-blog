import React from 'react';
import PostItem from 'components/list/PostItem';
import styles from './PostList.module.scss';

const PostList = ({ posts }) => {
  const postList = posts.map(post => (
    <PostItem key={post.node.id} post={post} />
  ));
  return <div className={styles.postList}>{postList}</div>;
};

export default PostList;
