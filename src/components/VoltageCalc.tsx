import React, { ChangeEvent, Component } from "react"
import FormRange from "react-bootstrap/FormRange"

export class VoltageCalc extends Component {
    state = {
        voltage: 62.88,
        result: "100.01% battery"
    }

    quickVoltages = [
        47.00,
        48.00,
        49.00,
        50.00,
        50.50,
        51.00,
        51.50,
        52.00,
        52.50,
        53.00,
        53.50,
        54.00,
        54.50,
        55.00,
        55.50,
        56.00,
        56.50,
        57.00,
        57.50,
        58.00,
        58.50,
        59.00,
        59.50,
        60.00,
        60.50,
        61.00,
        61.50,
        62.00
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

        this.setState({ result: `${calcPercentage.toFixed(2)}% battery` })
    }

    render() {
        return (
            <>
                <label>Result</label>
                <code key="voltageResult">{this.state.result}</code>
                
                <label>Voltage</label>
                <input className="half-width" key="voltage" type="number" step={0.01} value={this.state.voltage} onChange={e => this.setVoltage(e)}></input>
                <FormRange className="half-width" key="voltageSlider" step="0.50" value={this.state.voltage} min={this.quickVoltages.at(0)} max={this.quickVoltages.at(this.quickVoltages.length - 1)} onChange={e => this.setVoltage(e)}></FormRange>

                <label>Quick Values</label>
                <div className="flex-row flex-center">
                    {this.quickVoltages.map((v) => (
                        <button className="padded" onClick={e => this.setVoltage(v)}>{v.toFixed(1)}V</button>
                    ))}
                </div>

                <br />
                <i>Formula by <a href="https://github.com/biell" target="_blank">biell</a></i>
            </>
        )
    }
}