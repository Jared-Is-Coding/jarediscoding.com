import React, { ChangeEvent, Component } from "react"
import FormRange from "react-bootstrap/FormRange"

export class CellBasedVoltageCalc extends Component {
    state = {
        voltage: 4.20,
        cellCount: 15,
        result: "100.00%"
    }

    quickVoltages = [
        2.70,
        2.80,
        2.90,
        3.00,
        3.10,
        3.20,
        3.30,
        3.40,
        3.50,
        3.60,
        3.70,
        3.80,
        3.90,
        4.00,
        4.10,
        4.20
    ]

    cellCounts = [
        15,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27
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

    setCellCount = (e: ChangeEvent<HTMLInputElement> | number) => {
        if (!e || (typeof e !== "number" && !e.target.value)) return
        
        const value = typeof e === "number"
            ? e
            : e.target.value 
                ? parseInt(e.target.value)
                : 0
        
        if (this.state.cellCount == value) return
        
        this.setState({ cellCount: value.toFixed(0) }, this.doCalculation)
    }

    doCalculation = () => {
        const calcPercentage = (
            (
                (
                    535
                    / (
                        (
                            4.2
                            + Math.pow(36, (4.2 - this.state.voltage))
                        )
                        * (
                            4.2
                            / this.state.voltage
                        )
                    )
                )
                - 2.8
            )
            / this.state.cellCount
        )

        this.setState({ result: `${calcPercentage.toFixed(2)}%` })
    }

    render() {
        return (
            <>
                <label>Result</label>
                <code style={{fontSize: "2em", padding: "10px"}} key="voltageResult">{this.state.result}</code>
                
                <label>Cell Configuration</label>
                <input className="half-width" key="voltage" type="number" step={1} value={this.state.cellCount} onChange={e => this.setCellCount(e)}></input>

                <label>Quick Cell Configuration</label>
                <div className="flex-row flex-center">
                    <button key={`cellCountButton-xr`} className="padded col-sm-2" onClick={e => this.setCellCount(15)}>XR</button>
                    <button key={`cellCountButton-xr`} className="padded col-sm-2" onClick={e => this.setCellCount(15)}>Pint</button>
                    <button key={`cellCountButton-xr`} className="padded col-sm-2" onClick={e => this.setCellCount(15)}>Pint X</button>
                    <button key={`cellCountButton-gt`} className="padded col-sm-2" onClick={e => this.setCellCount(18)}>GT</button>
                    <button key={`cellCountButton-adv`} className="padded col-sm-2" onClick={e => this.setCellCount(20)}>ADV</button>
                    <button key={`cellCountButton-gts`} className="padded col-sm-2" onClick={e => this.setCellCount(27)}>GT-S</button>
                    {this.cellCounts.map((v, i) => (
                        <button key={`cellCountButton-${i}`} className="padded col-sm-2" onClick={e => this.setCellCount(v)}>{v.toFixed(0)}s</button>
                    ))}
                </div>

                <label>Voltage</label>
                <input className="half-width" key="voltage" type="number" step={0.05} value={this.state.voltage} onChange={e => this.setVoltage(e)}></input>
                <FormRange className="half-width" key="voltageSlider" step="0.05" value={this.state.voltage} min={this.quickVoltages.at(0)} max={this.quickVoltages.at(this.quickVoltages.length - 1)} onChange={e => this.setVoltage(e)}></FormRange>

                <label>Quick Voltage</label>
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