import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { FaDiscord, FaNodeJs, FaReact, FaWordpress } from "react-icons/fa"
import { SiExpress, SiGatsby, SiTypescript } from "react-icons/si"
import { MetaData } from "../components/MetaData"
import { ProjectCard } from "../components/ProjectCard"
import { SiteFooter } from "../components/SiteFooter"
import { projectData } from "../types"

export const Head: HeadFC = () => (
    <>
        <html lang="en" />
        <MetaData />
    </>
)

const currentProjectData: projectData[] = [
    {
        text: ["Elemental Bot for Discord"],
        image: "/images/projects/elementalbot.com/icon.png",
        imageTitle: "Elemental Logo",
        imageAlt: "Logo icon for the Elemental Bot on Discord",
        url: ["https://elementalbot.com/"],
        target: "_blank",
        position: "Owner",
        technologies: <><FaNodeJs title="Node JS" /> <SiTypescript title="TypeScript" /> <SiExpress title="Express" /> <FaDiscord title="Discord" /></>
    },
    {
        text: ["Red Barrels Games"],
        image: "/images/projects/redbarrelsgames.com/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for redbarrelsgames.com",
        url: ["https://redbarrelsgames.com/"],
        target: "_blank",
        position: "Developer, Consultant",
        technologies: <><FaWordpress title="WordPress" /> <FaDiscord title="Discord" /></>
    },
    {
        text: ["PubParts.xyz"],
        image: "/images/projects/pubparts.xyz/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for pubparts.xyz",
        url: ["https://pubparts.xyz/"],
        target: "_blank",
        position: "Owner",
        technologies: <><FaReact title="React" /> <SiTypescript title="TypeScript" /> <SiGatsby title="Gatsby" /></>
    },
    {
        text: ["French Creek Bible Conference"],
        image: "/images/projects/frenchcreek.org/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for frenchcreek.org",
        url: ["https://frenchcreek.org/"],
        target: "_blank",
        position: "Lead Developer, Consultant",
        technologies: <><FaWordpress title="WordPress" /></>
    },
    {
        text: ["Cherry Park Band"],
        image: "/images/projects/cherryparkband.com/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for cherryparkband.com",
        url: ["https://cherryparkband.com/"],
        target: "_blank",
        position: "Owner",
        technologies: <><FaReact title="React" /> <SiTypescript title="TypeScript" /> <SiGatsby title="Gatsby" /></>
    },
    {
        text: ["JaredIsCoding", "Tools"],
        image: "/images/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for jarediscoding.com",
        url: ["/", "/tools/"],
        target: "_self",
        position: "Owner",
        technologies: <><FaReact title="React" /> <SiTypescript title="TypeScript" /> <SiGatsby title="Gatsby" /></>
    }
]

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            {/* <header></header> */}

            <main>
                <Container>
                    <h1 className="flex-center">
                        Jared is Coding
                    </h1>

                    <p className="flex-center">Here are some of my professional projects:</p>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                            {currentProjectData.map(ProjectCard)}
                        </Col>
                    </Row>
                </Container>
            </main>
            
            <SiteFooter />
        </>
    )
}

export default IndexPage