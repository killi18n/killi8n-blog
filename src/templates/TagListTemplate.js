import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/common/Layout';
import Pagination from 'components/common/Pagination';
// import Image from '../components/image';
import SEO from 'components/seo';
import PostList from 'components/list/PostList';

const TagListTemplate = props => {
  //   console.log(props);
  const {
    pageContext: { tag, posts },
  } = props;
  //   console.log(posts);
  //   const {
  //     pageContext: { limit, skip, numPages, currentPage, tag },
  //     data: {
  //       allMarkdownRemark: { edges },
  //     },
  //   } = props;

  //   const { data } = props;
  // const { allMarkdownRemark } = data;
  // const { edges } = allMarkdownRemark;
  // edges: array
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
