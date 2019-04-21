import React from 'react';
import { Link } from 'gatsby';
import styles from './Pagination.module.scss';

const Pagination = ({ numPages, currentPage }) => {
  //   const pageList = Array.from({ length: numPages }).map((_, i) => {
  //     return (
  //       <Link to={`/page/${i + 1}`} key={i}>
  //         {i + 1}
  //       </Link>
  //     );
  //   });

  return (
    <div className={styles.pagination}>
      {currentPage === 1 ? (
        <div className={[styles.button, styles.disabled].join(' ')}>Prev</div>
      ) : (
        <Link
          to={currentPage === 2 ? `/` : `/page/${currentPage - 1}`}
          className={styles.button}
        >
          Prev
        </Link>
      )}
      <div className={styles.center}>
        {currentPage} / {numPages}
      </div>
      {currentPage === numPages ? (
        <div
          className={[styles.button, styles.right, styles.disabled].join(' ')}
        >
          Next
        </div>
      ) : (
        <Link
          to={`/page/${currentPage + 1}`}
          className={[styles.button, styles.right].join(' ')}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
