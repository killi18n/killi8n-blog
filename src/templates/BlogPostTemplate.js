import React from 'react';
import { graphql, Link } from 'gatsby';
import SEO from 'components/seo';
import Layout from 'components/common/Layout';
import styles from './BlogPostTemplate.module.scss';

const BlogPostTemplate = props => {
  console.log(props);
  const {
    data: {
      markdownRemark: {
        frontmatter: { date, title, tags },
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
        <div className={styles.postDetailDate}>{date}</div>
        <div className={styles.postDetailMarkdown}>
          <div
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        </div>
        <div className={styles.tagsWrapper}>
          <div className={styles.tagsTitle}>TAGS</div>
          {tags &&
            tags.length > 0 &&
            tags.map(tag => (
              <Link to={`/tag/${tag}`} className={styles.tag}>
                #{tag}
              </Link>
            ))}
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
        tags
      }
    }
  }
`;

export default BlogPostTemplate;
