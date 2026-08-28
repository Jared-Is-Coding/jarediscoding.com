import type { Metadata } from "next"
import Link from "next/link"
import { LevelTool } from "../../../components/LevelTool"

export const metadata: Metadata = {
	title: "Digital Level | Tools | Jared Is Coding",
	description:
		"Precision digital level and bubble inclinometer using your device's gyroscope motion sensors. Measure surface level, angles, and calibrate offsets.",
}

export default function LevelToolPage() {
	return (
		<div>
			<section style={{ textAlign: "center", margin: "2rem 0" }}>
				<h1>Digital Level</h1>
				<p style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}>
					<Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
						← Back to Tools
					</Link>
				</p>
			</section>

			<LevelTool />
		</div>
	)
}
