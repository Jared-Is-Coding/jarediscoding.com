import { type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { Col, Container, Row } from "react-bootstrap"
import { FaDiscord, FaNodeJs, FaReact, FaWordpress } from "react-icons/fa"
import { SiExpress, SiGatsby, SiTypescript } from "react-icons/si"
import { MetaData } from "../components/MetaData"
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

// TODO | This needs some cleanup
type ProjectDataUrlProps = {
    url: string
    urlIndex: number
    project: projectData
}

// TODO | This needs some cleanup
const ProjectDataUrl = ({url, urlIndex, project}: ProjectDataUrlProps) => {
    return (
        <>
            {urlIndex > 0 && <i> | </i>}
            <a href={url} target={project.target}>
                {project.text[urlIndex]}
            </a>
        </>
    )
}

// TODO | This needs some cleanup
const mapProjectData = (project: projectData, index: number) => (
        <div className="card">
            <div key={`project-main-${project.text.at(0)}-${index}`} className="flex-row flex-center">
                {(project.image) &&
                    <img key={`project-${project.text.at(0)}-${index}-image`} className="card-image flex-center" src={project.image} title={project.imageTitle} alt={project.imageAlt}></img>
                }
                
                <span className="card-content">
                    {project.url.map((url, urlIndex) => (
                        // TODO | This needs some cleanup
                        <ProjectDataUrl url={url} urlIndex={urlIndex} project={project} key={`project-${project.text.at(0)}-${index}-content-${url}`} />
                    ))}
                </span>
            </div>
    
            {(project.position || project.technologies) &&
                <div key={`project-info-${project.text.at(0)}-${index}`} className="flex-col flex-center">
                    <p>
                        {(project.technologies) &&
                            project.technologies
                        }
    
                        {(project.technologies && project.position) &&
                            " | "
                        }
    
                        {(project.position) &&
                            project.position
                        }
                    </p>
                </div>
            }
        </div>
)

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
                            {currentProjectData.map(mapProjectData)}
                        </Col>
                    </Row>
                </Container>
            </main>
            
            <SiteFooter />
        </>
    )
}

export default IndexPage