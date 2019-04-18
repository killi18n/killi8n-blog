import React from 'react';
import { Link } from 'gatsby';
import styles from './Header.module.scss';

const Header = ({ title, description }) => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.headerTitle}>
        {title}
      </Link>
      <div className={styles.description}>{description}</div>
    </div>
  );
};

export default Header;
