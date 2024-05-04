import React, { ChangeEvent, Component } from "react"
import { Alert } from "react-bootstrap"
import FormRange from "react-bootstrap/FormRange"

export class CellBasedVoltageCalc extends Component {
    state = {
        voltage: 56.35,
        cellCount: 15,
        cellVoltage: 3.757,
        result: "49.84%",
        showSaved: false,
        showCleared: false
    }

    quickVoltages = [
        50.00,
        55.00,
        60.00,
        65.00,
        70.00,
        75.00,
        80.00,
        85.00,
        90.00,
        95.00,
        100.00,
        105.00,
        110.00,
        115.00
    ]

    cellCounts = [
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
        [27, "(GT-S)"]
    ]

    setVoltage = (e: ChangeEvent<HTMLInputElement | HTMLButtonElement> | number) => {
        if (!e || (typeof e !== "number" && !e.target.value)) return
        
        const value = typeof e === "number"
            ? e
            : e.target.value 
                ? parseFloat(e.target.value)
                : 0
        
        if (this.state.voltage == value) return
        
        this.setState({ voltage: value.toFixed(2), cellVoltage: (value / this.state.cellCount).toFixed(3) }, this.doCalculation)
    }

    setCellCount = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!e || !e.target.value) return
        
        const value = e.target.value 
            ? parseInt(e.target.value)
            : 0
        
        if (this.state.cellCount == value) return
        
        this.setState({ cellCount: value.toFixed(0), cellVoltage: (this.state.voltage / value).toFixed(3) }, this.doCalculation)
    }

    doCalculation = () => {
        const calcPercentage = (
            (
                535
                / (
                    (
                        4.2
                        + Math.pow(36, (4.2 - this.state.cellVoltage))
                    )
                    * (
                        4.2
                        / this.state.cellVoltage
                    )
                )
            )
            - 2.8
        )

        this.setState({ result: `${calcPercentage.toFixed(2)}%` })
    }

    componentDidMount() {
            const savedVoltage = localStorage.getItem("savedVoltage")
            const savedCellCount = localStorage.getItem("savedCellCount")

            if (savedVoltage && savedCellCount) {
                this.setState({
                    voltage: parseFloat(savedVoltage).toFixed(2),
                    cellVoltage: (parseFloat(savedVoltage) / parseFloat(savedCellCount)).toFixed(3),
                    cellCount: parseFloat(savedCellCount).toFixed(0)
                }, this.doCalculation)
            }
    }

    saveSetup = () => {
        localStorage.setItem("savedVoltage", this.state.voltage.toString())
        localStorage.setItem("savedCellCount", this.state.cellCount.toString())

        this.setState({ showSaved: true })
        setTimeout(() => {
            this.setState({ showSaved: false })
        }, 3000)
    }

    clearSetup = () => {
        localStorage.removeItem("savedVoltage")
        localStorage.removeItem("savedCellCount")

        this.setState({ showCleared: true })
        setTimeout(() => {
            this.setState({ showCleared: false })
        }, 3000)
    }

    render = () => {
        return (
            <>
                <label>Result</label>
                <code style={{fontSize: "2em", padding: "10px"}} key="voltageResult">{this.state.result}</code>
                
                <label>Cell Configuration</label>
                <select className="half-width" key="cellCount" value={this.state.cellCount} onChange={e => this.setCellCount(e)}>
                    {this.cellCounts.map((v, i) => (
                        <option key={`cellCount-` + v.at(0)} value={v.at(0)}>{v.at(0)}s {v.at(1)}</option>
                    ))}
                </select>

                <label>Voltage</label>
                <input className="half-width" key="voltage" type="number" step={0.01} value={this.state.voltage} onChange={e => this.setVoltage(e)}></input>
                <FormRange className="half-width" key="voltageSlider" step="0.05" value={this.state.voltage} min={this.state.cellCount * 2.85} max={this.state.cellCount * 4.20} onChange={e => this.setVoltage(e)}></FormRange>

                <label>Quick Voltage</label>
                <div className="flex-row flex-center full-width">
                    {this.quickVoltages.map((v, i) => (
                        <button key={`voltageButton-${i}`} className="padded col-sm-3" onClick={e => this.setVoltage(v)}>{v.toFixed(1)}V</button>
                    ))}
                </div>

                <br />
                <label>Save current Cell Configuration and Voltage</label>
                <div className="flex-row flex-center full-width">
                    <button className="padded col-5" onClick={e => this.saveSetup()}>Save Config</button>
                    <button className="padded col-5" onClick={e => this.clearSetup()}>Clear Config</button>

                    <Alert key="savedAlert" className="floating" variant="dark" onClose={() => this.setState({ showSaved: false })} show={this.state.showSaved}>
                        <p>Configuration saved</p>
                    </Alert>
                    <Alert key="clearedAlert" className="floating" variant="dark" onClose={() => this.setState({ showCleared: false })} show={this.state.showCleared}>
                        <p>Configuration cleared</p>
                    </Alert>
                </div>

                <br />
                <i>Formula by <a href="https://github.com/biell" target="_blank">biell</a></i>
            </>
        )
    }
}