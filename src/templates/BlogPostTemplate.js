import React from 'react';
import { graphql } from 'gatsby';
import SEO from 'components/seo';
import Layout from 'components/common/Layout';
import styles from './BlogPostTemplate.module.scss';

const BlogPostTemplate = props => {
  console.log(props);
  const {
    data: {
      markdownRemark: {
        frontmatter: { date, path, title },
        html,
      },
    },
  } = props;
  return (
    <Layout>
      <SEO
        title={`killi8n's blog - ${title}`}
        keywords={[
          `react`,
          `node.js`,
          `graphql`,
          `music`,
          `rock`,
          `metal`,
          `gig`,
        ]}
      />
      <div className={styles.postDetailWrapper}>
        <div className={styles.postDetailTitle}>{title}</div>
        <div className={styles.postDetailMarkdown}>
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export const postDetailQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;

export default BlogPostTemplate;
