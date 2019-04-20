import React from 'react';
import SEO from 'components/seo';

const BlogPostTemplate = ({ pageContext }) => {
  const { title } = pageContext;
  return (
    <div>
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
    </div>
  );
};

export default BlogPostTemplate;
