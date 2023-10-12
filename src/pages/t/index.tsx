import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { MetaData } from "../../components/MetaData"
import "../../css/styles.scss"


export const Head: HeadFC = () => (
    <MetaData title="Tools | Jared is Coding" />
)

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <main className="flex-col flex-center">
                <div className="col-item">
                    <h1>
                        Tools
                    </h1>
                    <p><a href="/">ᐊ Home</a></p>
                </div>

                <div className="flex-col">
                    <a href="psicalc">OneWheel PSI Calculator</a>
                </div>
            </main>
        </>
    )
}

export default IndexPage