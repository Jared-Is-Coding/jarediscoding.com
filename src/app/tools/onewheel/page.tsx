import type { Metadata } from "next"
import { CellBasedVoltageCalc } from "../../../components/CellBasedVoltageCalc"
import { PsiCalc } from "../../../components/PsiCalc"

export const metadata: Metadata = {
	title: "OneWheel Tools | Tools | Jared Is Coding",
	description: "Calculate Onewheel battery percentage from voltage and get recommended tire pressure (PSI).",
}

export default function OneWheelToolsPage() {
	return (
		<div>
			<section style={{ textAlign: "center", margin: "2rem 0" }}>
				<h1>OneWheel Tools</h1>
				<p style={{ fontSize: "1.1rem", marginTop: "0.5rem" }}>
					<a href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
						← Back to Tools
					</a>
				</p>
			</section>

			<div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "1.5rem" }}>
				<div className="glass-card">
					<h2 style={{ fontSize: "1.4rem", textTransform: "none" }}>Battery Voltage to %</h2>
					<div style={{ marginTop: "1rem" }}>
						<CellBasedVoltageCalc />
					</div>
				</div>

				<div className="glass-card">
					<h2 style={{ fontSize: "1.4rem", textTransform: "none" }}>PSI Suggestion</h2>
					<div style={{ marginTop: "1rem" }}>
						<PsiCalc />
					</div>
				</div>
			</div>
		</div>
	)
}
