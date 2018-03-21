import * as React from "react";
type Data = {
  data: {
    allMarkdownRemark: {
      edges: {
        node: {
          html: string,
          fileAbsolutePath: string,
          frontmatter: {
            title: string,
            state: string
          }
        }
      }[]
    }
  }
}

export default function Template({ data }: Data) {
  const { allMarkdownRemark } = data;
  const main = allMarkdownRemark.edges
    .filter(edge => !edge.node.frontmatter.state)
    .map(edge => edge.node)
    .map(node => (
      <div>
        <h1>{node.frontmatter.title}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: node.html }}
        />
      </div>
    ));
  const states = allMarkdownRemark.edges
    .filter(edge => edge.node.frontmatter.state)
    .map(edge => edge.node)
    .map(node => (
      <div>
        <h2>State: {node.frontmatter.title}</h2>
        <div
          dangerouslySetInnerHTML={{ __html: node.html }}
        />
      </div>
    ));
  return (
    <div>
      {main}
      {states}
    </div>
  );
}

export const pageQuery = graphql`
query ModuleMarkdownFiles {
  allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/^G:/Code/doclooks/gatsby/src/pages/modules/button/"
      }
    }
  )
    {
    edges {
      node {
        html
        fileAbsolutePath
        frontmatter {
          title
          state
        }
      }
    }
  }
}
`;
