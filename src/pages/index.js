import React from 'react';
// import { Link } from 'gatsby';

import Layout from 'components/common/Layout';
// import Image from '../components/image';
import SEO from 'components/seo';
import PostList from 'components/list/PostList';

const IndexPage = () => (
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
    <PostList />
  </Layout>
);

export default IndexPage;
