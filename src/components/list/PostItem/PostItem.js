import React from 'react';
import { Link } from 'gatsby';
import styles from './PostItem.module.scss';

const PostItem = ({ post }) => {
  const {
    node: {
      frontmatter: { title, path },
    },
  } = post;
  return (
    <div>
      <Link to={path} className={styles.postTitle}>
        {title}
      </Link>
    </div>
  );
};

export default PostItem;
