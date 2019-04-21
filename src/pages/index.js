import React from 'react';
import { graphql } from 'gatsby';

import Layout from 'components/common/Layout';
// import Image from '../components/image';
import SEO from 'components/seo';
import PostList from 'components/list/PostList';

const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;
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
      <PostList posts={edges} />
    </Layout>
  );
};

export const postListQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`;

export default IndexPage;
