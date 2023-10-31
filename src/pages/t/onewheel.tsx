import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { Col, Container, Row } from "react-bootstrap"
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
            <main>
                <Container>
                    <h1 className="flex-center">
                        OneWheel Tools
                    </h1>

                    <p className="flex-center">
                        <a href="/t">ᐊ Tools</a>
                    </p>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                            <div className="flex-center flex-col card">
                                <h2>
                                    Battery Voltage to %
                                </h2>
                                
                                <VoltageCalc />
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                            <div className="flex-center flex-col card">
                                <h2>
                                    PSI Suggestion
                                </h2>
                                
                                <PsiCalc />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default IndexPage