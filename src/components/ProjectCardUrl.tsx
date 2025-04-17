import React from "react"
import { projectData } from "../types"

type ProjectDataUrlProps = {
    url: string
    urlIndex: number
    project: projectData
}

export const ProjectCardUrl = ({url, urlIndex, project}: ProjectDataUrlProps) => (
    <>
        {urlIndex > 0 && <i> | </i>}
        <a href={url} target={project.target}>
            {project.text[urlIndex]}
        </a>
    </>
)