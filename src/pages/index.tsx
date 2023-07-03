import { Link, type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { MetaData } from "../components/MetaData"
import { StickyFooter } from "../components/StickyFooter"
import "../css/styles.scss"

export const Head: HeadFC = () => (
    <MetaData />
)

const projectData = [
    {
        text: "Elemental Bot for Discord",
        image: "/images/projects/elemental/icon.png",
        imageTitle: "Elemental Logo",
        imageAlt: "Logo icon for the Elemental Bot on Discord",
        url: "https://elementalbot.com/",
        target: "_blank"
    },
    {
        text: "JaredIsCoding.com",
        image: "/images/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for jarediscoding.com",
        url: "https://JaredIsCoding.com/",
        target: "_self"
    },
    {
        text: "CherryParkBand.com",
        image: "/images/icon.png",
        imageTitle: "Website Logo",
        imageAlt: "Logo icon for cherryparkband.com",
        url: "https://CherryParkBand.com/",
        target: "_self"
    }
]

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <main className="flex-col flex-center">
                <div>
                    <h1>
                        Work in Progress
                    </h1>
                </div>

                <div>
                    <p>In the mean time, here are some of Jared's projects</p>
                </div>

                <div className="flex-row">
                    {projectData.map((project) => (
                        <div className="row-item card flex-row">
                            {(project.image) &&
                                <img className="card-image flex-center" src={project.image} title={project.imageTitle} alt={project.imageAlt}></img>
                            }
                            
                            <span className="card-content flex-center">
                                <Link to={project.url} target={project.target}>
                                    {project.text}
                                </Link>
                            </span>
                        </div>
                    ))}
                </div>
            </main>
            
            <StickyFooter />
        </>
    )
}

export default IndexPage