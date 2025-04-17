import { Link, type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { CellBasedVoltageCalc } from "../../components/CellBasedVoltageCalc"
import { MetaData } from "../../components/MetaData"
import { PsiCalc } from "../../components/PsiCalc"

export const Head: HeadFC = () => (
    <>
        <html lang="en" />
        <MetaData title="OneWheel Tools | Tools | Jared is Coding" />
    </>
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
                        <Link to="/tools/">ᐊ Tools</Link>
                    </p>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
                            <div className="flex-center flex-col card">
                                <h2>
                                    Battery Voltage to %
                                </h2>
                                
                                <CellBasedVoltageCalc />
                            </div>
                        </Col>

                        <Col xs={{span: 12}} md={{span: 10, offset: 1}} lg={{span: 8, offset: 2}}>
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