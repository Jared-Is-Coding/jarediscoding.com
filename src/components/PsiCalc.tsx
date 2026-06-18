"use client"

import { useState } from "react"

const quickWeights = [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230] as const

export function PsiCalc() {
	const [weight, setWeight] = useState(165)
	const [terrain, setTerrain] = useState("trail")
	const [tire, setTire] = useState("slick")

	// Compute recommendation directly during render
	const calcPsi = weight / 10 - (terrain === "trail" ? 1 : 0) - (tire === "treaded" && terrain === "trail" ? 1 : 0)
	const minMaxPsi = Math.max(Math.min(calcPsi, 25), 13)
	const result = `${Math.round(minMaxPsi)} psi`

	const handleWeightChange = (val: number) => {
		if (isNaN(val)) return
		setWeight(val)
	}

	return (
		<div className="calc-container">
			<div className="calc-result-box">
				<span className="calc-result-label">Recommended Tire Pressure</span>
				<span className="calc-result-value">{result}</span>
			</div>

			<div className="form-group">
				<label htmlFor="terrain-config">Terrain</label>
				<select
					id="terrain-config"
					className="calc-select"
					value={terrain}
					onChange={(e) => setTerrain(e.target.value)}>
					<option value="trail">Trail</option>
					<option value="road">Road</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="tire-config">Tire Type</label>
				<select id="tire-config" className="calc-select" value={tire} onChange={(e) => setTire(e.target.value)}>
					<option value="slick">Slick</option>
					<option value="treaded">Treaded</option>
				</select>
			</div>

			<div className="form-group">
				<label htmlFor="weight-input">Rider Weight (lbs)</label>
				<input
					id="weight-input"
					type="number"
					className="calc-input"
					min="100"
					max="250"
					value={weight}
					onChange={(e) => handleWeightChange(parseInt(e.target.value, 10))}
				/>

				<div className="calc-slider-container">
					<input
						type="range"
						className="calc-slider"
						step="5"
						min={quickWeights[0]}
						max={quickWeights[quickWeights.length - 1]}
						value={weight}
						onChange={(e) => handleWeightChange(parseInt(e.target.value, 10))}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							fontSize: "0.75rem",
							color: "var(--text-muted)",
						}}>
						<span>Min ({quickWeights[0]} lbs)</span>
						<span>Max ({quickWeights[quickWeights.length - 1]} lbs)</span>
					</div>
				</div>
			</div>

			<div className="form-group">
				<label>Quick Weight Presets</label>
				<div className="quick-grid">
					{quickWeights.map((w) => (
						<button key={w} type="button" className="quick-btn" onClick={() => handleWeightChange(w)}>
							{w}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
