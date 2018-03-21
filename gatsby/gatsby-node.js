const path = require("path");

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const moduleTemplate = path.resolve(`src/templates/module.tsx`);

  return graphql(`
{
  allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/index.md$/"
      }
    }
  )
    {
    edges {
      node {
        fileAbsolutePath
        html
        frontmatter {
          title
          state
        }
      }
    }
  }
}`)
    .then(
      result => {
        if (result.errors) {
          return Promise.reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(
          ({ node }) => {
            createPage({
              path: `module/${node.frontmatter.title.toLowerCase()}`,
              component: moduleTemplate,
              context: {},
            });
          }
        );
      }
    );
};