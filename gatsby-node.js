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

  const blogListTemplate = path.resolve(`src/templates/BlogListTemplate.js`);
  const blogPostTemplate = path.resolve(`src/templates/BlogPostTemplate.js`);

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              path
              date
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;
    const postsPerPage = 5;

    const numPages = Math.ceil(posts.length / postsPerPage);

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: blogListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      });
    });

    posts.forEach(({ node }) => {
      // if (node.frontmatter.tags && node.frontmatter.tags.length > 0) {

      // node.frontmatter.tags.forEach((tag, i) => {
      //   createPage({
      //     path: `/tags/${tag}`,
      //     component: tagListTemplate,
      //     context: {
      //       tag: tag,
      //     },
      //   });
      // });
      // }

      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
        context: {
          numPages,
        },
      });
    });

    createPaginationPageByTag(graphql, createPage);

    // createPaginationPageByTag(graphql).then(result => {
    //   const {
    //     data: {
    //       allMarkdownRemark: { group },
    //     },
    //   } = result;
    //   group.forEach((groupInfo, i) => {
    //     createPage({
    //       path: `/tag/${groupInfo.fieldValue}`,
    //       component: tagListTemplate,
    //       context: {
    //         tag: groupInfo.fieldValue,
    //         posts: groupInfo.edges,
    //       },
    //     });
    //   });
    // });
  });
};

const createPaginationPageByTag = (graphql, createPage) => {
  const tagListTemplate = path.resolve(`src/templates/TagListTemplate.js`);
  graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        group(field: frontmatter___tags) {
          fieldValue
          totalCount
          edges {
            node {
              id
              excerpt
              frontmatter {
                title
                path
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw new Error(result.errors);
    }
    const {
      data: {
        allMarkdownRemark: { group },
      },
    } = result;
    group.forEach((groupInfo, i) => {
      createPage({
        path: `/tag/${groupInfo.fieldValue}`,
        component: tagListTemplate,
        context: {
          tag: groupInfo.fieldValue,
          posts: groupInfo.edges,
        },
      });
    });
  });
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;
//   console.log('node check', node);
//   // if (node.internal.type === `MarkdownRemark`) {
//   //   const value = createFilePath({ node, getNode })
//   //   createNodeField({
//   //     name: `slug`,
//   //     node,
//   //     value,
//   //   })
//   // }
// };
