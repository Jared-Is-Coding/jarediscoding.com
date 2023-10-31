import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { MetaData } from "../../components/MetaData"
import { PsiCalc } from "../../components/PsiCalc"
import { VoltageCalc } from "../../components/VoltageCalc"
import "../../css/styles.scss"


export const Head: HeadFC = () => (
    <MetaData title="OneWheel Tools | Tools | Jared is Coding" />
)

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <main className="flex-col flex-center">
                <div>
                    <h1>
                        OneWheel Tools
                    </h1>
                    <p><a href="/t">ᐊ Tools</a></p>
                </div>

                <div className="flex-col card half-width">
                    <h2>
                        Battery Voltage to %
                    </h2>
                    <VoltageCalc />
                </div>

                <div className="flex-col card half-width">
                    <h2>
                        PSI Suggestion
                    </h2>
                    <PsiCalc />
                </div>
            </main>
        </>
    )
}

export default IndexPage