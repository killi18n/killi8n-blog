import React from 'react';
// import { graphql } from 'gatsby';
import Layout from 'components/common/Layout';
// import Pagination from 'components/common/Pagination';
// import Image from '../components/image';
import SEO from 'components/seo';
import PostList from 'components/list/PostList';
import styles from './TagListTemplate.module.scss';

const TagListTemplate = props => {
  const {
    pageContext: { tag, posts },
  } = props;
  return (
    <Layout>
      <SEO
        title="killi8n's blog - home"
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
      <div className={styles.tagTemplateTitle}>#{tag}</div>
      <PostList posts={posts} />
      {/* <Pagination numPages={numPages} currentPage={currentPage} /> */}
    </Layout>
  );
};

// export const tagListQuery = graphql`
//   query tagListQuery($tag: String!) {
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       filter: { frontmatter: { tags: { eq: $tag } } }
//     ) {
//       edges {
//         node {
//           id
//           excerpt
//           frontmatter {
//             title
//             path
//             date
//           }
//         }
//       }
//     }
//   }
// `;

export default TagListTemplate;
