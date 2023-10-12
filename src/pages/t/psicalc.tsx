import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { MetaData } from "../../components/MetaData"
import { PsiCalc } from "../../components/PsiCalc"
import "../../css/styles.scss"


export const Head: HeadFC = () => (
    <MetaData title="OneWheel Tire Pressure Calculator" />
)

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <main className="flex-col flex-center">
                <div className="col-item">
                    <h1>
                        OneWheel PSI Calc
                    </h1>
                    <p><a href="/t">ᐊ Tools</a></p>
                </div>

                <div className="flex-col">
                    <PsiCalc />
                </div>
            </main>
        </>
    )
}

export default IndexPage