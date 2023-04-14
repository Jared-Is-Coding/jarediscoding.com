import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"

/** 
 * Website name to be used across the browser and embeds
 */
const pageTitle = "Jared Is Coding"

export const Head: HeadFC = () => (
    <>
        {/* Site name */}
        <title>{pageTitle}</title>
        <meta name="site_name" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
        
        {/* Site properties */}
        <meta property="og:type" content="website" />

        {/* Site is responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
)

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const doclistStyles = {
  paddingLeft: 0,
}

const linkStyle = {
  color: "#8954A8",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%",
}

const docLinkStyle = {
  ...linkStyle,
  listStyleType: "none",
  display: `inline-block`,
  marginBottom: 24,
  marginRight: 12,
}

const docLinks = [
  {
    text: "TypeScript Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/custom-configuration/typescript/",
    color: "#8954A8",
  },
  {
    text: "GraphQL Typegen Documentation",
    url: "https://www.gatsbyjs.com/docs/how-to/local-development/graphql-typegen/",
    color: "#8954A8",
  }
]

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        Welcome
      </h1>
      <ul style={doclistStyles}>
        {docLinks.map(doc => (
          <li key={doc.url} style={docLinkStyle}>
            <a
              style={linkStyle}
              href={`${doc.url}?utm_source=starter&utm_medium=ts-docs&utm_campaign=minimal-starter-ts`}
            >
              {doc.text}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default IndexPage