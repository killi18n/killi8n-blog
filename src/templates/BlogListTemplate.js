import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/common/Layout';
import Pagination from 'components/common/Pagination';
// import Image from '../components/image';
import SEO from 'components/seo';
import PostList from 'components/list/PostList';

const BlogListTemplate = props => {
  const {
    pageContext: { numPages, currentPage },
    data: {
      allMarkdownRemark: { edges },
    },
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
      <PostList posts={edges} />
      <Pagination numPages={numPages} currentPage={currentPage} />
    </Layout>
  );
};

export const postListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            title
            path
            date
          }
        }
      }
    }
  }
`;

export default BlogListTemplate;
