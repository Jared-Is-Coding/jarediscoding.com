import { Link, type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { SiteMetaData } from "../components/SiteMetaData"
import { StickyFooter } from "../components/StickyFooter"
import "../css/styles.scss"

export const Head: HeadFC = () => (
    <SiteMetaData />
)

const projectData = [
    {
        text: "Elemental Bot for Discord",
        image: "/images/projects/elemental/icon.png",
        url: "https://elementalbot.com/",
        target: "_blank"
    },
    {
        text: "JaredIsCoding.com",
        image: "/images/icon.png",
        url: "https://JaredIsCoding.com/",
        target: "_self"
    }
]

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <main className="flex-col flex-center">
                <div className="col-item">
                    <h1>
                        Work in Progress
                    </h1>
                </div>
                <div className="col-item">
                    <p>In the mean time, here are some of Jared's projects</p>
                </div>
                <div className="col-item flex-row">
                    {projectData.map((project) => (
                        <div className="row-item card flex-row">
                            {(project.image) &&
                                <img className="card-image flex-center" src={project.image}></img>

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