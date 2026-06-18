import type { Metadata } from "next"
import Image from "next/image"
import { FaDiscord, FaNodeJs, FaReact, FaWordpress } from "react-icons/fa"
import { SiExpress, SiGatsby, SiTypescript } from "react-icons/si"

export const metadata: Metadata = {
	title: "Home | Jared Is Coding",
	description: "Explore the professional projects and software development work of Jared Harrison.",
}

type Project = {
	names: string[]
	urls: string[]
	image: string
	imageAlt: string
	imageTitle: string
	isPngBg?: boolean
	target: string
	position?: string
	technologies: React.ReactNode
}

const projects: Project[] = [
	{
		names: ["Elemental Bot for Discord"],
		urls: ["https://elementalbot.com/"],
		image: "/images/projects/elementalbot.com/icon.png",
		imageTitle: "Elemental Logo",
		imageAlt: "Logo icon for the Elemental Bot on Discord",
		target: "_blank",
		position: "Owner",
		technologies: (
			<>
				<FaNodeJs title="Node JS" />
				<SiTypescript title="TypeScript" />
				<SiExpress title="Express" />
				<FaDiscord title="Discord" />
			</>
		),
	},
	{
		names: ["Red Barrels Games"],
		urls: ["https://redbarrelsgames.com/"],
		image: "/images/projects/redbarrelsgames.com/icon.png",
		imageTitle: "Website Logo",
		imageAlt: "Logo icon for redbarrelsgames.com",
		target: "_blank",
		position: "Developer, Consultant",
		technologies: (
			<>
				<FaWordpress title="WordPress" />
				<FaDiscord title="Discord" />
			</>
		),
	},
	{
		names: ["PubParts.xyz"],
		urls: ["https://pubparts.xyz/"],
		image: "/images/projects/pubparts.xyz/icon.png",
		imageTitle: "Website Logo",
		imageAlt: "Logo icon for pubparts.xyz",
		target: "_blank",
		position: "Owner",
		technologies: (
			<>
				<FaReact title="React" />
				<SiTypescript title="TypeScript" />
				<SiGatsby title="Gatsby" />
			</>
		),
	},
	{
		names: ["French Creek Bible Conference"],
		urls: ["https://frenchcreek.org/"],
		image: "/images/projects/frenchcreek.org/icon.png",
		imageTitle: "Website Logo",
		imageAlt: "Logo icon for frenchcreek.org",
		target: "_blank",
		position: "Developer, Consultant",
		technologies: (
			<>
				<FaWordpress title="WordPress" />
			</>
		),
	},
	{
		names: ["Cherry Park Band"],
		urls: ["https://cherryparkband.com/"],
		image: "/images/projects/cherryparkband.com/icon.png",
		imageTitle: "Website Logo",
		imageAlt: "Logo icon for cherryparkband.com",
		target: "_blank",
		position: "Owner",
		technologies: (
			<>
				<FaReact title="React" />
				<SiTypescript title="TypeScript" />
				<SiGatsby title="Gatsby" />
			</>
		),
	},
	{
		names: ["JaredIsCoding", "Tools"],
		urls: ["/", "/tools"],
		image: "/images/icon.png",
		imageTitle: "Website Logo",
		imageAlt: "Logo icon for jarediscoding.com",
		isPngBg: true,
		target: "_self",
		position: "Owner",
		technologies: (
			<>
				<FaReact title="React" />
				<SiTypescript title="TypeScript" />
				<SiGatsby title="Gatsby" />
			</>
		),
	},
]

export default function HomePage() {
	return (
		<div>
			<section style={{ textAlign: "center", margin: "3rem 0" }}>
				<h1>Jared Harrison</h1>
				<p style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}>
					Software developer creating exceptional digital solutions across web and app platforms.
				</p>
			</section>

			<section>
				<h2 style={{ textAlign: "center" }}>Professional Projects</h2>
				<div style={{ marginTop: "1.5rem" }}>
					{projects.map((project, index) => (
						<div key={index} className="glass-card">
							<div className="project-card-layout">
								<div className={`project-img-container ${project.isPngBg ? "png-bg" : ""}`}>
									<Image
										src={project.image}
										alt={project.imageAlt}
										title={project.imageTitle}
										className="project-icon"
										width={60}
										height={60}
									/>
								</div>

								<div className="project-info">
									<div className="project-title-row">
										<div className="project-link-group">
											{project.urls.map((url, urlIndex) => (
												<span key={urlIndex}>
													{urlIndex > 0 && <span className="project-separator"> | </span>}
													<a
														href={url}
														target={project.target}
														rel={
															project.target === "_blank"
																? "noopener noreferrer"
																: undefined
														}
														className="project-link">
														{project.names[urlIndex]}
													</a>
												</span>
											))}
										</div>
									</div>

									<div className="project-meta-row">
										{project.technologies && (
											<div className="tech-icons">{project.technologies}</div>
										)}
										{project.technologies && project.position && (
											<span style={{ color: "var(--text-muted)" }}>•</span>
										)}
										{project.position && (
											<span className="project-position">{project.position}</span>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
