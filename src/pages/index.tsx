import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { MetaData } from "../components/MetaData"
import { SiteFooter } from "../components/SiteFooter"
import "../css/styles.scss"

export const Head: HeadFC = () => (
    <MetaData />
)

const personalProjectData: projectData[] = [
    {
        text: ["Elemental Bot for Discord"],
        image: "/images/projects/elementalbot.com/icon.png",
        imageTitle: "Elemental Logo",
        imageAlt: "Logo icon for the Elemental Bot on Discord",
        url: ["https://elementalbot.com/"],
        target: "_blank"
    },
    {
        text: ["Cherry Park Band"],
        image: "/images/projects/cherryparkband.com/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for cherryparkband.com",
        url: ["https://cherryparkband.com/"],
        target: "_blank"
    },
    {
        text: ["JaredIsCoding", "Tools"],
        image: "/images/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for jarediscoding.com",
        url: ["/", "/tools/"],
        target: "_self"
    }
]

const professionalProjectData: projectData[] = [
    {
        text: ["Red Barrels Games", "Support"],
        image: "/images/projects/redbarrelsgames.com/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for redbarrelsgames.com",
        url: ["https://redbarrelsgames.com/","https://redbarrelsgames.com/support/"],
        target: "_blank"
    }
]

const mapProjectData = (project: projectData, index: number) => (
    <>
        <div key={`project-data-item-${index}`} className="flex-row flex-center card">
            {(project.image) &&
                <img className="card-image flex-center" src={project.image} title={project.imageTitle} alt={project.imageAlt}></img>
            }
            
            <span className="card-content flex-center">
                {project.url.map((url, urlIndex) => (
                    <>
                        {urlIndex >= 1 && 
                            <b> | </b>
                        }
                        <a key={`project-data-item-url-${index}`} href={url} target={project.target}>
                            {project.text[urlIndex]}
                        </a>
                    </>
                ))}
            </span>
        </div>
    </>
)

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <header></header>

            <main>
                <Container>
                    <h1 className="flex-center">
                        Jared is Coding
                    </h1>

                    <p className="flex-center">Here are some of Jared's personal projects:</p>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                            {personalProjectData.map(mapProjectData)}
                        </Col>
                    </Row>

                    <p className="flex-center">Here are some of Jared's professional projects:</p>

                    <Row>
                        <Col xs={{span: 12}} md={{span: 8, offset: 2}} lg={{span: 6, offset: 3}}>
                            {professionalProjectData.map(mapProjectData)}
                        </Col>
                    </Row>
                </Container>
            </main>
            
            <SiteFooter />
        </>
    )
}

export default IndexPage