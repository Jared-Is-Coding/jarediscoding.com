import type { Metadata } from "next"
import Link from "next/link"

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
					<Link href="/tools/onewheel" className="tool-button">
						Open Tools →
					</Link>
				</div>

				<div className="glass-card tool-card">
					<div>
						<h3>Digital Bubble Level</h3>
						<p>
							Precision spirit level and inclinometer using your device&apos;s gyroscope sensors to check
							surface level, plumb edges, and measure angles with real-time feedback.
						</p>
					</div>
					<Link href="/tools/level" className="tool-button">
						Open Level →
					</Link>
				</div>
			</div>
		</div>
	)
}
