/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.modifyWebpackConfig = ({ config, _stage }) => {
  return config.merge({
    resolve: {
      alias: {
        styles: path.resolve(config._config.context, 'src/styles'),
      },
    },
  });
};

exports.createPages = props => {
  const {
    actions: { createPage },
    graphql,
  } = props;

  const blogPostTemplate = path.resolve(`src/templates/BlogPostTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              title
              path
              date
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {},
      });
    });
  });
};
