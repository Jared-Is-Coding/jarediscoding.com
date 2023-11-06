import { HeadFC, Link, PageProps } from "gatsby"
import * as React from "react"
import { MetaData } from "../components/MetaData"

export const Head: HeadFC = () => (
    <>
        <html lang="en" />
        <MetaData title="404 | Jared is Coding" />
    </>
)

const NotFoundPage: React.FC<PageProps> = () => {
    return (
        <main className="flex-col flex-center">
            <div>
                <h1>
                    404
                </h1>
                <p>That page doesn't exist</p>
            </div>

            <div className="flex-center">
                <p><Link to="/">ᐊ Home</Link></p>
            </div>
        </main>
    )
}

export default NotFoundPage
