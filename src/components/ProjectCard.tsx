import React from "react"
import { projectData } from "../types"
import { ProjectCardUrl } from "./ProjectCardUrl"

export const ProjectCard = (project: projectData, index: number) => (
    <>
        <div className="card">
            <div key={`project-main-${project.text.at(0)}-${index}`} className="flex-row flex-center">
                {(project.image) &&
                    <img key={`project-${project.text.at(0)}-${index}-image`} className="card-image flex-center" src={project.image} title={project.imageTitle} alt={project.imageAlt}></img>
                }
                
                <span className="card-content">
                    {project.url.map((url, urlIndex) => (
                        // TODO | This needs some cleanup
                        <ProjectCardUrl url={url} urlIndex={urlIndex} project={project} key={`project-${project.text.at(0)}-${index}-content-${url}`} />
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
    </>
)