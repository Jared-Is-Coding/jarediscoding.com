import { HeadFC, Link, PageProps } from "gatsby"
import * as React from "react"
import { siteMetaData } from "../components/siteMetaData"
import "../css/styles.scss"

export const Head: HeadFC = () => (
    siteMetaData({title: "404 | Page not found"})
)

const headingStyles = {
    marginTop: 0,
    marginBottom: 64,
    maxWidth: 320,
}

const paragraphStyles = {
    marginBottom: 48,
}

const codeStyles = {
    color: "#8A6534",
    padding: 4,
    backgroundColor: "#FFF4DB",
    fontSize: "1.25rem",
    borderRadius: 4,
}

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <main>
            <h1 style={headingStyles}>Page not found</h1>
            <p style={paragraphStyles}>
                Sorry, we couldn't find what you were looking for.
                <br />
                {process.env.NODE_ENV === "development" ? (
                    <>
                        <br />
                        Try creating a page in <code style={codeStyles}>src/pages/</code>.
                        <br />
                    </>
                ) : null}
                <br />
                <Link to="/">Go home</Link>.
            </p>
        </main>
    )
}

export default NotFoundPage
