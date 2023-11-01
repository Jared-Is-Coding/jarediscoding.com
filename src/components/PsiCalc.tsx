import React, { ChangeEvent, Component } from "react"
import FormRange from "react-bootstrap/FormRange"

export class PsiCalc extends Component {
    state = {
        weight: 165,
        terrain: "road",
        tire: "slick",
        result: "15 psi"
    }

    quickWeights = [
        120,
        130,
        140,
        150,
        160,
        170,
        180,
        190,
        200,
        210,
        220,
        230
    ]

    setWeight = (e: ChangeEvent<HTMLInputElement> | number) => {
        if (!e || (typeof e !== "number" && !e.target.value)) return

        const value = typeof e === "number"
            ? e
            : e.target.value 
                ? parseInt(e.target.value)
                : 0

        if (this.state.weight == value) return
        
        this.setState({ weight: value }, this.doCalculation)
    }

    setTerrain = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) return

        if (this.state.terrain != e.target.value) {
            this.setState({ terrain: e.target.value }, this.doCalculation)
        }
    }

    setTire = (e: ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) return

        if (this.state.tire != e.target.value) {
            this.setState({ tire: e.target.value }, this.doCalculation)
        }
    }

    doCalculation = () => {
        const calcPsi = (
            (this.state.weight / 10)
            - (this.state.terrain == "trail" ? 1 : 0)
            - (this.state.tire == "treaded" && this.state.terrain == "trail" ? 1 : 0)
        )
        const minMaxPsi = Math.max(Math.min(calcPsi, 25), 13)

        this.setState({ result: `${Math.round(minMaxPsi)} psi` })
    }

    render() {
        return (
            <>
                <label>Result</label>
                <code style={{fontSize: "2em", padding: "10px"}} key="psiResult">{this.state.result}</code>
                
                <label>Terrain</label>
                <select className="half-width" key="psiTerrain" value={this.state.terrain} onChange={e => this.setTerrain(e)}>
                    <option value="road">Road</option>
                    <option value="trail">Trail</option>
                </select>

                <label>Tire</label>
                <select className="half-width" key="psiTire" value={this.state.tire} onChange={e => this.setTire(e)}>
                    <option value="slick">Slick</option>
                    <option value="treaded">Treaded</option>
                </select>

                <label>Weight</label>
                <input className="half-width" key="psiWeight" type="number" min={100} max={250} step={1} value={this.state.weight} onChange={e => this.setWeight(e)}></input>
                <FormRange className="half-width" key="psiWeightSlider" step="5" value={this.state.weight} min={this.quickWeights.at(0)} max={this.quickWeights.at(this.quickWeights.length - 1)} onChange={e => this.setWeight(e)}></FormRange>

                <label>Quick Weights</label>
                <div className="flex-row flex-center">
                    {this.quickWeights.map((v, i) => (
                        <button key={`weightButton-${i}`} className="padded col-sm-2" onClick={e => this.setWeight(v)}>{v}lbs</button>
                    ))}
                </div>
            </>
        )
    }
}