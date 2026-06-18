"use client"

import { useEffect, useState } from "react"

const baseCellCount = 15
const quickVoltageButtonCount = 12

const cellCounts = [
	[15, "(XR, Pint, Pint-X)"],
	[18, "(GT)"],
	[19, ""],
	[20, "(ADV)"],
	[21, ""],
	[22, ""],
	[23, ""],
	[24, ""],
	[25, ""],
	[26, ""],
	[27, "(GT-S)"],
] as const

export function CellBasedVoltageCalc() {
	const [voltage, setVoltage] = useState(56.35)
	const [cellCount, setCellCount] = useState(baseCellCount)
	const [showSaved, setShowSaved] = useState(false)
	const [showCleared, setShowCleared] = useState(false)

	const voltageMin = cellCount * 2.85
	const voltageMax = cellCount * 4.2
	const cellVoltage = cellCount > 0 ? voltage / cellCount : 0

	// Calculation formula
	const calculatePercentage = (vCell: number) => {
		if (vCell <= 0) return "0.00%"
		const calcPercentage = 535 / ((4.2 + Math.pow(36, 4.2 - vCell)) * (4.2 / vCell)) - 2.8
		const clamped = Math.max(Math.min(calcPercentage, 100), 0)
		return `${clamped.toFixed(2)}%`
	}

	// Calculate result directly during render
	const result = calculatePercentage(cellVoltage)

	// Load from localStorage on mount
	useEffect(() => {
		const savedVoltage = localStorage.getItem("savedVoltage")
		const savedCellCount = localStorage.getItem("savedCellCount")

		if (savedVoltage && savedCellCount) {
			const parsedVoltage = parseFloat(savedVoltage)
			const parsedCellCount = parseInt(savedCellCount, 10)
			if (!isNaN(parsedVoltage) && !isNaN(parsedCellCount)) {
				setTimeout(() => {
					setVoltage(parsedVoltage)
					setCellCount(parsedCellCount)
				}, 0)
			}
		}
	}, [])

	const handleVoltageChange = (val: number) => {
		if (isNaN(val)) return
		setVoltage(parseFloat(val.toFixed(2)))
	}

	const handleCellCountChange = (val: number) => {
		setCellCount(val)
	}

	const saveSetup = () => {
		localStorage.setItem("savedVoltage", voltage.toString())
		localStorage.setItem("savedCellCount", cellCount.toString())
		setShowSaved(true)
		const timer = setTimeout(() => setShowSaved(false), 3000)
		return () => clearTimeout(timer)
	}

	const clearSetup = () => {
		localStorage.removeItem("savedVoltage")
		localStorage.removeItem("savedCellCount")
		setShowCleared(true)
		const timer = setTimeout(() => setShowCleared(false), 3000)
		return () => clearTimeout(timer)
	}

	return (
		<div className="calc-container">
			<div className="calc-result-box">
				<span className="calc-result-label">Battery Level</span>
				<span className="calc-result-value">{result}</span>
			</div>

			<div className="form-group">
				<label htmlFor="cell-config">Cell Configuration</label>
				<select
					id="cell-config"
					className="calc-select"
					value={cellCount}
					onChange={(e) => handleCellCountChange(parseInt(e.target.value, 10))}>
					{cellCounts.map(([cells, label]) => (
						<option key={cells} value={cells}>
							{cells}s {label}
						</option>
					))}
				</select>
			</div>

			<div className="form-group">
				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<label htmlFor="voltage-input">Voltage (V)</label>
					<span style={{ fontSize: "0.85rem", color: "var(--text-slate)" }}>
						Cell Avg: <code style={{ color: "var(--accent-teal)" }}>{cellVoltage.toFixed(3)}V</code>
					</span>
				</div>

				<input
					id="voltage-input"
					type="number"
					className="calc-input"
					step="0.01"
					min={voltageMin.toFixed(2)}
					max={voltageMax.toFixed(2)}
					value={voltage}
					onChange={(e) => handleVoltageChange(parseFloat(e.target.value))}
				/>

				<div className="calc-slider-container">
					<input
						type="range"
						className="calc-slider"
						step="0.05"
						min={voltageMin}
						max={voltageMax}
						value={voltage}
						onChange={(e) => handleVoltageChange(parseFloat(e.target.value))}
					/>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							fontSize: "0.75rem",
							color: "var(--text-muted)",
						}}>
						<span>Min ({voltageMin.toFixed(1)}V)</span>
						<span>Max ({voltageMax.toFixed(1)}V)</span>
					</div>
				</div>
			</div>

			<div className="form-group">
				<label>Quick Voltage Presets</label>
				<div className="quick-grid">
					{[...Array(quickVoltageButtonCount)].map((_, i) => {
						const buttonVoltage = Math.round(
							voltageMin + ((voltageMax - voltageMin) / quickVoltageButtonCount) * (i + 1),
						)
						return (
							<button
								key={i}
								type="button"
								className="quick-btn"
								onClick={() => handleVoltageChange(buttonVoltage)}>
								{buttonVoltage.toFixed(1)}V
							</button>
						)
					})}
				</div>
			</div>

			<div className="action-row">
				<button type="button" className="action-btn primary" onClick={saveSetup}>
					Save Setup
				</button>
				<button type="button" className="action-btn" onClick={clearSetup}>
					Clear Setup
				</button>
			</div>

			{showSaved && (
				<div className="toast-alert">
					<p>✓ Configuration saved locally</p>
				</div>
			)}
			{showCleared && (
				<div className="toast-alert" style={{ borderColor: "#ef4444" }}>
					<p style={{ color: "#ef4444" }}>✗ Configuration cleared</p>
				</div>
			)}

			<p className="formula-credit">
				Formula by{" "}
				<a href="https://github.com/biell" target="_blank" rel="noopener noreferrer">
					biell
				</a>
			</p>
		</div>
	)
}
