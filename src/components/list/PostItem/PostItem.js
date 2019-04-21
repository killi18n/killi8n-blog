import React from 'react';
import { Link } from 'gatsby';
import styles from './PostItem.module.scss';

const PostItem = ({ post }) => {
  const {
    node: {
      excerpt,
      frontmatter: { title, path, date },
    },
  } = post;
  return (
    <Link to={path} className={styles.postItemWrapper}>
      <div className={styles.postTitle}>{title}</div>
      <div className={styles.postExcerpt}>{excerpt}</div>
      <div className={styles.postDate}>{date}</div>
    </Link>
  );
};

export default PostItem;
