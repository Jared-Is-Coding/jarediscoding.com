import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { Container } from "react-bootstrap"
import { MetaData } from "../../components/MetaData"
import "../../css/styles.scss"


export const Head: HeadFC = () => (
    <MetaData title="Tools | Jared is Coding" />
)

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <main>
                <Container>
                    <h1 className="flex-center">
                        Tools
                    </h1>

                    <p className="flex-center">
                        <a href="/">ᐊ Home</a>
                    </p>

                    <div className="flex-center">
                        <div className="flex-col card">
                            <a href="onewheel">OneWheel Tools</a>
                        </div>
                    </div>
                </Container>
            </main>
        </>
    )
}

export default IndexPage