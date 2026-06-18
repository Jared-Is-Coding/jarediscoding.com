import type { Metadata } from "next"

export const metadata: Metadata = {
	title: "Tools | Jared Is Coding",
	description: "A collection of helpful developer and utility tools created by Jared.",
}

export default function ToolsPage() {
	return (
		<div>
			<section style={{ textAlign: "center", margin: "3rem 0" }}>
				<h1>Tools</h1>
				<p style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}>Utility calculations and helpers.</p>
			</section>

			<div className="tools-grid">
				<div className="glass-card tool-card">
					<div>
						<h3>OneWheel Tools</h3>
						<p>
							Calculate Onewheel battery voltage percentages and look up recommended tire pressure (PSI)
							based on your weight and riding style.
						</p>
					</div>
					<a href="/tools/onewheel" className="tool-button">
						Open Tools →
					</a>
				</div>
			</div>
		</div>
	)
}
