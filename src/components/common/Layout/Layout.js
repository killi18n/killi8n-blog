import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Header from 'components/common/Header';
import 'styles/base.scss';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              description
            }
          }
        }
      `}
      render={data => (
        <div className={styles.layoutWrapper}>
          <Header
            title={data.site.siteMetadata.title}
            description={data.site.siteMetadata.description}
          />
          <main className={styles.main}>{children}</main>
        </div>
      )}
    />
  );
};

export default Layout;
