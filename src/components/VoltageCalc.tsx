import React, { ChangeEvent, Component } from "react"
import { Container } from "react-bootstrap"

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
                <label>Voltage</label>
                <input className="half-width" key="voltage" type="number" step={0.01} value={this.state.voltage} onChange={e => this.setVoltage(e)}></input>

                <label>Quick Values</label>
                <div className="flex-row flex-center">
                    {this.quickVoltages.map((v) => (
                        <button className="padded" onClick={e => this.setVoltage(v)}>{Math.round(v)}V</button>
                    ))}
                </div>

                <label>Result</label>
                <code key="voltageResult">{this.state.result}</code>
                
                <br />
                <i>Formula by <a href="https://github.com/biell" target="_blank">biell</a></i>
            </>
        )
    }
}