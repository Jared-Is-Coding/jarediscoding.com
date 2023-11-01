import React, { ChangeEvent, Component } from "react"
import FormRange from "react-bootstrap/FormRange"

export class VoltageCalc extends Component {
    state = {
        voltage: 62.88,
        result: "100.01%"
    }

    quickVoltages = [
        47.00,
        48.00,
        49.00,
        50.00,
        51.00,
        52.00,
        53.00,
        54.00,
        55.00,
        56.00,
        57.00,
        58.00,
        59.00,
        60.00,
        61.00,
        62.00,
        63.00
    ]

    setVoltage = (e: ChangeEvent<HTMLInputElement> | number) => {
        if (!e || (typeof e !== "number" && !e.target.value)) return
        
        const value = typeof e === "number"
            ? e
            : e.target.value 
                ? parseFloat(e.target.value)
                : 0
        
        if (this.state.voltage == value) return
        
        this.setState({ voltage: value.toFixed(2) }, this.doCalculation)
    }

    doCalculation = () => {
        const calcPercentage = (
            (
                100
                / (
                    (
                        0.93
                        + Math.pow(1.26, (54 - this.state.voltage))
                    )
                    * (
                        54
                        / this.state.voltage
                    )
                )
            )
            - 10
        )

        this.setState({ result: `${calcPercentage.toFixed(2)}%` })
    }

    render() {
        return (
            <>
                <label>Result</label>
                <code style={{fontSize: "2em", padding: "10px"}} key="voltageResult">{this.state.result}</code>
                
                <label>Voltage</label>
                <input className="half-width" key="voltage" type="number" step={0.01} value={this.state.voltage} onChange={e => this.setVoltage(e)}></input>
                <FormRange className="half-width" key="voltageSlider" step="0.50" value={this.state.voltage} min={this.quickVoltages.at(0)} max={this.quickVoltages.at(this.quickVoltages.length - 1)} onChange={e => this.setVoltage(e)}></FormRange>

                <label>Quick Values</label>
                <div className="flex-row flex-center">
                    {this.quickVoltages.map((v, i) => (
                        <button key={`voltageButton-${i}`} className="padded col-sm-2" onClick={e => this.setVoltage(v)}>{v.toFixed(1)}V</button>
                    ))}
                </div>

                <br />
                <i>Formula by <a href="https://github.com/biell" target="_blank">biell</a></i>
            </>
        )
    }
}