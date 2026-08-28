"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
	FaCheckCircle,
	FaCircle,
	FaCrosshairs,
	FaExclamationTriangle,
	FaLock,
	FaMobileAlt,
	FaRedo,
	FaShieldAlt,
	FaUnlock,
	FaVial,
	FaVihara,
} from "react-icons/fa"

type ViewMode = "bullseye" | "tubes" | "combined"

export function LevelTool() {
	// Stable display values for the UI
	const [displayPitch, setDisplayPitch] = useState<number>(0)
	const [displayRoll, setDisplayRoll] = useState<number>(0)

	// Calibration offsets
	const [calibratedPitch, setCalibratedPitch] = useState<number>(0)
	const [calibratedRoll, setCalibratedRoll] = useState<number>(0)
	const [isCalibrated, setIsCalibrated] = useState<boolean>(false)

	// Hold states
	const [isHold, setIsHold] = useState<boolean>(false)
	const [holdPitch, setHoldPitch] = useState<number>(0)
	const [holdRoll, setHoldRoll] = useState<number>(0)

	// Settings & Sensor States
	const [viewMode, setViewMode] = useState<ViewMode>("combined")
	const [hapticEnabled, setHapticEnabled] = useState<boolean>(true)
	const [sensorActive, setSensorActive] = useState<boolean>(false)
	const [isSecure, setIsSecure] = useState<boolean>(true)
	const [activationAttempted, setActivationAttempted] = useState<boolean>(false)
	const [isBraveDetected, setIsBraveDetected] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	// Internal refs for single-source target, smoothed physics, and hysteresis
	const isHoldRef = useRef<boolean>(false)
	const targetPitchRef = useRef<number>(0)
	const targetRollRef = useRef<number>(0)
	const smoothedPitchRef = useRef<number>(0)
	const smoothedRollRef = useRef<number>(0)
	const displayedPitchHysteresisRef = useRef<number>(0)
	const displayedRollHysteresisRef = useRef<number>(0)
	const activeSensorTypeRef = useRef<"orientation" | "motion" | null>(null)
	const lastVibrateTimeRef = useRef<number>(0)
	const wasLevelRef = useRef<boolean>(false)

	useEffect(() => {
		isHoldRef.current = isHold
	}, [isHold])

	// Hysteresis rounding to prevent digit flickering on boundary values
	const applyHysteresis = (currentSmoothed: number, lastReported: number): number => {
		const roundedTarget = Math.round(currentSmoothed * 10) / 10
		// If difference from last reported rounded digit is tiny (< 0.07°), keep last reported
		if (Math.abs(currentSmoothed - lastReported) < 0.07) {
			return lastReported
		}
		return roundedTarget
	}

	// Attach single-source listeners with prioritized fallback
	const initSensors = useCallback(() => {
		if (typeof window === "undefined") return

		// Handler for standard DeviceOrientation
		const handleOrientation = (event: DeviceOrientationEvent) => {
			if (event.beta === null || event.gamma === null) return

			activeSensorTypeRef.current = "orientation"
			targetPitchRef.current = event.beta
			targetRollRef.current = event.gamma
			setSensorActive(true)
		}

		// Fallback handler for DeviceMotion (accelerometer gravity)
		const handleMotion = (event: DeviceMotionEvent) => {
			// Only use motion if orientation is not active
			if (activeSensorTypeRef.current === "orientation") return

			const acc = event.accelerationIncludingGravity
			if (acc && acc.x !== null && acc.y !== null && acc.z !== null) {
				activeSensorTypeRef.current = "motion"
				const gx = acc.x
				const gy = acc.y
				const gz = acc.z

				// Compute pitch (beta) and roll (gamma) in degrees
				const pitchDeg = Math.atan2(gy, Math.sqrt(gx * gx + gz * gz)) * (180 / Math.PI)
				const rollDeg = Math.atan2(-gx, Math.sqrt(gy * gy + gz * gz)) * (180 / Math.PI)

				targetPitchRef.current = pitchDeg
				targetRollRef.current = rollDeg
				setSensorActive(true)
			}
		}

		window.addEventListener("deviceorientation", handleOrientation, true)
		window.addEventListener("devicemotion", handleMotion, true)

		return () => {
			window.removeEventListener("deviceorientation", handleOrientation, true)
			window.removeEventListener("devicemotion", handleMotion, true)
		}
	}, [])

	// Setup sensors and smooth physics loop on mount
	useEffect(() => {
		if (typeof window === "undefined") return

		if (window.isSecureContext === false) {
			const timer = setTimeout(() => {
				setIsSecure(false)
			}, 0)
			return () => clearTimeout(timer)
		}

		const nav = navigator as unknown as { brave?: { isBrave?: () => Promise<boolean> } }
		if (typeof nav.brave?.isBrave === "function") {
			nav.brave
				.isBrave()
				.then((isB) => {
					if (isB) setIsBraveDetected(true)
				})
				.catch(() => {})
		}

		const cleanupSensors = initSensors()

		let lastFrameTime = performance.now()
		let animId: number

		const physicsLoop = (time: number) => {
			const dt = Math.min((time - lastFrameTime) / 1000, 0.1) // time delta in seconds
			lastFrameTime = time

			if (!isHoldRef.current) {
				const targetP = targetPitchRef.current
				const targetR = targetRollRef.current

				const diffP = targetP - smoothedPitchRef.current
				const diffR = targetR - smoothedRollRef.current
				const totalDiff = Math.sqrt(diffP * diffP + diffR * diffR)

				// Fluid viscosity smoothing factor based on real frame time
				// When held steady: tau ~ 0.18s (silky smooth damping)
				// When moving fast: tau ~ 0.06s (instant response)
				const tau = totalDiff > 2.0 ? 0.06 : 0.18
				const alpha = 1 - Math.exp(-dt / tau)

				smoothedPitchRef.current += diffP * alpha
				smoothedRollRef.current += diffR * alpha

				// Apply stable hysteresis for the digital readouts
				const stableP = applyHysteresis(smoothedPitchRef.current, displayedPitchHysteresisRef.current)
				const stableR = applyHysteresis(smoothedRollRef.current, displayedRollHysteresisRef.current)

				displayedPitchHysteresisRef.current = stableP
				displayedRollHysteresisRef.current = stableR

				setDisplayPitch(stableP)
				setDisplayRoll(stableR)
			}

			animId = requestAnimationFrame(physicsLoop)
		}

		animId = requestAnimationFrame(physicsLoop)

		return () => {
			if (cleanupSensors) cleanupSensors()
			cancelAnimationFrame(animId)
		}
	}, [initSensors])

	// Explicit user activation handler for iOS 13+ and Android
	const activateSensors = async () => {
		setActivationAttempted(true)
		setErrorMessage(null)

		if (typeof window === "undefined") return

		try {
			if (navigator.permissions && navigator.permissions.query) {
				try {
					await navigator.permissions.query({ name: "accelerometer" as PermissionName })
				} catch {
					// Ignore
				}
				try {
					await navigator.permissions.query({ name: "gyroscope" as PermissionName })
				} catch {
					// Ignore
				}
			}

			const DeviceOrientationAny = window.DeviceOrientationEvent as unknown as {
				requestPermission?: () => Promise<"granted" | "denied">
			}
			if (typeof DeviceOrientationAny?.requestPermission === "function") {
				const res = await DeviceOrientationAny.requestPermission()
				if (res !== "granted") {
					setErrorMessage("Sensor permission was denied in your browser settings.")
				}
			}

			const DeviceMotionAny = window.DeviceMotionEvent as unknown as {
				requestPermission?: () => Promise<"granted" | "denied">
			}
			if (typeof DeviceMotionAny?.requestPermission === "function") {
				try {
					await DeviceMotionAny.requestPermission()
				} catch {
					// Handled
				}
			}

			initSensors()
		} catch (err: unknown) {
			setErrorMessage(err instanceof Error ? err.message : "Unable to start motion sensors.")
		}
	}

	// Active values with hold & calibration
	const currentRawPitch = isHold ? holdPitch : displayPitch
	const currentRawRoll = isHold ? holdRoll : displayRoll

	const currentPitch = currentRawPitch - calibratedPitch
	const currentRoll = currentRawRoll - calibratedRoll

	// Total 2D tilt magnitude
	let totalOffset = Math.sqrt(currentPitch * currentPitch + currentRoll * currentRoll)
	if (totalOffset < 0.1) totalOffset = 0 // Clean snap to 0.0

	// Level tolerance thresholds
	const isPerfectLevel = totalOffset <= 0.3
	const isNearLevel = totalOffset <= 1.5 && !isPerfectLevel

	// Haptic pulse when crossing into level
	useEffect(() => {
		if (isPerfectLevel && !wasLevelRef.current) {
			const now = Date.now()
			if (now - lastVibrateTimeRef.current > 1000) {
				lastVibrateTimeRef.current = now

				if (hapticEnabled && typeof navigator !== "undefined" && navigator.vibrate) {
					try {
						navigator.vibrate(60)
					} catch {
						// Ignore
					}
				}
			}
		}
		wasLevelRef.current = isPerfectLevel
	}, [isPerfectLevel, hapticEnabled])

	const handleCalibrate = () => {
		setCalibratedPitch(currentRawPitch)
		setCalibratedRoll(currentRawRoll)
		setIsCalibrated(true)
	}

	const handleResetCalibration = () => {
		setCalibratedPitch(0)
		setCalibratedRoll(0)
		setIsCalibrated(false)
	}

	const toggleHold = () => {
		if (!isHold) {
			setHoldPitch(displayPitch)
			setHoldRoll(displayRoll)
			setIsHold(true)
		} else {
			setIsHold(false)
		}
	}

	// Clean, concise status feedback
	const getCorrectionGuidance = () => {
		if (isPerfectLevel) {
			return {
				status: "LEVEL",
				colorClass: "level-status-perfect",
				instructions: "Object is Level",
			}
		}

		if (isNearLevel) {
			return {
				status: "NEAR LEVEL",
				colorClass: "level-status-near",
				instructions: `Off by ${totalOffset.toFixed(1)}°`,
			}
		}

		const hints: string[] = []
		if (Math.abs(currentRoll) >= 0.5) {
			hints.push(currentRoll > 0 ? `Raise Left ▲ ${Math.abs(currentRoll).toFixed(1)}°` : `Raise Right ▲ ${Math.abs(currentRoll).toFixed(1)}°`)
		}
		if (Math.abs(currentPitch) >= 0.5) {
			hints.push(currentPitch > 0 ? `Raise Top ▲ ${Math.abs(currentPitch).toFixed(1)}°` : `Raise Bottom ▲ ${Math.abs(currentPitch).toFixed(1)}°`)
		}

		return {
			status: `${totalOffset.toFixed(1)}° OFF`,
			colorClass: "level-status-off",
			instructions: hints.join(" • ") || `Tilt ${totalOffset.toFixed(1)}°`,
		}
	}

	const guidance = getCorrectionGuidance()

	// Bubble coordinates for 2D circular spirit display
	const maxRadius = 75
	const scale = 4.5
	const rawX = currentRoll * scale
	const rawY = currentPitch * scale
	const distance = Math.sqrt(rawX * rawX + rawY * rawY)
	const clampedDistance = Math.min(distance, maxRadius)
	const angleRad = Math.atan2(rawY, rawX)
	const bubbleX = distance > 0 ? clampedDistance * Math.cos(angleRad) : 0
	const bubbleY = distance > 0 ? clampedDistance * Math.sin(angleRad) : 0

	// Dual axis bar positions
	const maxTubeOffset = 75
	const hTubeX = Math.max(-maxTubeOffset, Math.min(maxTubeOffset, currentRoll * scale))
	const vTubeY = Math.max(-maxTubeOffset, Math.min(maxTubeOffset, currentPitch * scale))

	return (
		<div className="level-container">
			{/* Insecure Context Warning */}
			{!isSecure && (
				<div
					className="level-alert-banner"
					style={{
						background: "rgba(234, 179, 8, 0.12)",
						borderColor: "rgba(234, 179, 8, 0.4)",
						color: "#fde047",
					}}>
					<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
						<FaExclamationTriangle />
						<span>
							<strong>Insecure Connection (HTTP):</strong> Mobile browsers strictly disable motion sensors
							over plain HTTP. Access via <strong>HTTPS</strong> or <strong>localhost</strong>.
						</span>
					</div>
				</div>
			)}

			{/* Sensor Activation Bar */}
			{!sensorActive && (
				<div className="glass-card level-permission-card animate-fade-in">
					<div className="level-permission-content">
						<FaMobileAlt size="2.2rem" className="level-icon-pulse" />
						<div>
							<h3 style={{ fontSize: "1.1rem", marginBottom: "0.2rem" }}>Activate Motion Sensors</h3>
							<p style={{ fontSize: "0.85rem", color: "var(--text-slate)" }}>
								Tap below to connect to your phone&apos;s gyroscope.
							</p>
						</div>
					</div>
					<button
						onClick={() => void activateSensors()}
						className="action-btn primary"
						style={{ minWidth: "150px" }}>
						Enable Gyroscope
					</button>
				</div>
			)}

			{/* Brave Browser Notice */}
			{!sensorActive && (activationAttempted || isBraveDetected) && (
				<div
					className="glass-card level-brave-notice animate-fade-in"
					style={{
						background: "rgba(251, 146, 60, 0.08)",
						border: "1px solid rgba(251, 146, 60, 0.3)",
						padding: "1rem 1.25rem",
					}}>
					<div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
						<FaShieldAlt size="1.4rem" style={{ color: "#fb923c", marginTop: "2px", flexShrink: 0 }} />
						<div>
							<h4 style={{ color: "#fb923c", fontSize: "0.95rem", marginBottom: "0.25rem" }}>
								Using Brave Browser on Android?
							</h4>
							<p style={{ fontSize: "0.85rem", color: "var(--text-slate)", lineHeight: 1.5 }}>
								Brave Shields blocks device motion sensors by default. To enable:
							</p>
							<ol
								style={{
									paddingLeft: "1.2rem",
									marginTop: "0.35rem",
									fontSize: "0.82rem",
									color: "var(--text-slate)",
								}}>
								<li>
									Tap the <strong>Brave Lion Icon</strong> in the address bar.
								</li>
								<li>
									Toggle Shields to <strong>DOWN</strong> (or allow Motion Sensors for this site).
								</li>
								<li>
									Refresh the page and tap <strong>Enable Gyroscope</strong>.
								</li>
							</ol>
						</div>
					</div>
				</div>
			)}

			{/* Sensor error banner */}
			{errorMessage && (
				<div className="level-alert-banner">
					<p>{errorMessage}</p>
				</div>
			)}

			{/* Top HUD: Clean Digits and Status */}
			<div className="level-hud glass-card">
				<div className="level-hud-header">
					<div className="level-hud-title">
						<span className={`level-status-pill ${guidance.colorClass}`}>
							{isPerfectLevel ? <FaCheckCircle /> : <FaCrosshairs />}
							{guidance.status}
						</span>
						{isHold && (
							<span className="level-hold-pill">
								<FaLock /> HOLD
							</span>
						)}
						{isCalibrated && (
							<span className="level-cal-pill">
								<FaRedo /> ZEROED
							</span>
						)}
						{sensorActive && (
							<span className="level-sensor-active-pill">
								● Active
							</span>
						)}
					</div>

					<div className="level-mode-switchers">
						<button
							onClick={() => setViewMode("combined")}
							className={`mode-btn ${viewMode === "combined" ? "active" : ""}`}
							title="Combined View">
							Combined
						</button>
						<button
							onClick={() => setViewMode("bullseye")}
							className={`mode-btn ${viewMode === "bullseye" ? "active" : ""}`}
							title="2D Bullseye Surface View">
							<FaCircle /> Surface
						</button>
						<button
							onClick={() => setViewMode("tubes")}
							className={`mode-btn ${viewMode === "tubes" ? "active" : ""}`}
							title="Pitch & Roll View">
							<FaVial /> Pitch &amp; Roll
						</button>
					</div>
				</div>

				{/* Primary Angle Digits */}
				<div className="level-readouts-grid">
					<div className="level-readout-item main">
						<div className="readout-label">TOTAL TILT</div>
						<div className={`readout-value ${guidance.colorClass}`}>{totalOffset.toFixed(1)}°</div>
					</div>
					<div className="level-readout-item">
						<div className="readout-label">PITCH</div>
						<div className="readout-value sub">
							{currentPitch > 0 ? `+${currentPitch.toFixed(1)}` : currentPitch.toFixed(1)}°
						</div>
					</div>
					<div className="level-readout-item">
						<div className="readout-label">ROLL</div>
						<div className="readout-value sub">
							{currentRoll > 0 ? `+${currentRoll.toFixed(1)}` : currentRoll.toFixed(1)}°
						</div>
					</div>
				</div>

				<div className="level-guidance-bar">
					<span className="guidance-text">{guidance.instructions}</span>
				</div>
			</div>

			{/* Visual Display Center: Bullseye and/or Pitch & Roll Bars */}
			<div className="level-visual-wrapper glass-card">
				{(viewMode === "bullseye" || viewMode === "combined") && (
					<div className="bullseye-section">
						<div className="bullseye-title">
							<span>2D Surface Level</span>
							<span className="bullseye-subtitle">Lay device flat on surface</span>
						</div>

						<div
							className={`bullseye-housing ${isPerfectLevel ? "perfect-level" : isNearLevel ? "near-level" : ""}`}>
							{/* Target rings */}
							<div className="bullseye-ring ring-10deg" title="10° Limit">
								<span className="ring-label">10°</span>
							</div>
							<div className="bullseye-ring ring-5deg" title="5° Limit">
								<span className="ring-label">5°</span>
							</div>
							<div className="bullseye-ring ring-2deg" title="2° Limit">
								<span className="ring-label">2°</span>
							</div>
							<div className="bullseye-ring ring-target" title="Level Zone (<0.5°)" />

							{/* Crosshair lines */}
							<div className="bullseye-crosshair-h" />
							<div className="bullseye-crosshair-v" />

							{/* Floating liquid bubble */}
							<div
								className={`bullseye-bubble ${isPerfectLevel ? "bubble-perfect" : ""}`}
								style={{
									transform: `translate(calc(-50% + ${bubbleX}px), calc(-50% + ${bubbleY}px))`,
								}}>
								<div className="bubble-highlight" />
							</div>

							{/* Center target dot */}
							<div className="bullseye-center-dot" />
						</div>
					</div>
				)}

				{(viewMode === "tubes" || viewMode === "combined") && (
					<div className="tubes-section">
						<div className="tubes-title">
							<span>Pitch &amp; Roll (Dual Axis)</span>
							<span className="tubes-subtitle">Front/back (Pitch) &amp; left/right (Roll) tilt</span>
						</div>

						{/* Horizontal Roll Bar */}
						<div className="tube-container horizontal">
							<div className="tube-header">
								<span>Roll (Left / Right)</span>
								<span className="tube-angle">{currentRoll.toFixed(1)}°</span>
							</div>
							<div className={`tube-vial ${Math.abs(currentRoll) <= 0.3 ? "perfect" : ""}`}>
								<div className="tube-graduations">
									<div className="tube-line left-limit" />
									<div className="tube-target-zone" />
									<div className="tube-line right-limit" />
								</div>
								<div
									className="tube-bubble"
									style={{
										transform: `translate(calc(-50% + ${hTubeX}px), -50%)`,
									}}>
									<div className="bubble-highlight" />
								</div>
							</div>
						</div>

						{/* Vertical Pitch Bar */}
						<div className="tube-container vertical">
							<div className="tube-header">
								<span>Pitch (Front / Back)</span>
								<span className="tube-angle">{currentPitch.toFixed(1)}°</span>
							</div>
							<div className={`tube-vial ${Math.abs(currentPitch) <= 0.3 ? "perfect" : ""}`}>
								<div className="tube-graduations">
									<div className="tube-line left-limit" />
									<div className="tube-target-zone" />
									<div className="tube-line right-limit" />
								</div>
								<div
									className="tube-bubble"
									style={{
										transform: `translate(calc(-50% + ${vTubeY}px), -50%)`,
									}}>
									<div className="bubble-highlight" />
								</div>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* Primary Action Controls: Zero/Calibrate, Hold, Haptics */}
			<div className="level-controls-card glass-card">
				<div className="level-controls-grid">
					{/* Zero Calibration */}
					<button
						onClick={isCalibrated ? handleResetCalibration : handleCalibrate}
						className={`action-btn ${isCalibrated ? "primary" : ""}`}
						title="Set current position as 0° (useful for camera bump offset or relative slopes)">
						<FaRedo /> {isCalibrated ? "Reset Zero" : "Zero / Calibrate"}
					</button>

					{/* Hold / Lock */}
					<button
						onClick={toggleHold}
						className={`action-btn ${isHold ? "primary" : ""}`}
						title="Freeze measurement to read in tight or awkward spaces">
						{isHold ? <FaLock /> : <FaUnlock />} {isHold ? "Release Hold" : "Hold Angle"}
					</button>

					{/* Haptic Vibration Toggle */}
					<button
						onClick={() => setHapticEnabled(!hapticEnabled)}
						className={`action-btn ${hapticEnabled ? "primary" : ""}`}
						title="Vibrate device when level is reached">
						<FaVihara /> {hapticEnabled ? "Haptics On" : "Haptics Off"}
					</button>
				</div>
			</div>
		</div>
	)
}
