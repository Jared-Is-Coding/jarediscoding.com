import { Link, type HeadFC, type PageProps } from "gatsby"
import * as React from "react"
import { siteMetaData } from "../components/siteMetaData"
import "../css/styles.scss"

export const Head: HeadFC = () => (
    siteMetaData({})
)

const projectData = [
    {
        text: "Elemental Bot for Discord",
        url: "https://elementalbot.com/",
        target: "_blank"
    },
    {
        text: "JaredIsCoding.com",
        url: "https://JaredIsCoding.com/",
        target: "_self"
    }
]

const IndexPage: React.FC<PageProps> = () => {
    return (
        <>
            <main className="flex-col flex-wrap flex-center">
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
                        <div className="row-item card">
                            <Link to={project.url} target={project.target}>
                                {project.text}
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

export default IndexPage