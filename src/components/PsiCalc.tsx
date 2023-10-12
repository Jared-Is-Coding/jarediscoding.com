import React, { ChangeEvent, Component } from "react"

export class PsiCalc extends Component {
    state = {
        weight: 150,
        terrain: "road",
        tire: "slick",
        result: "Suggested: 15 psi"
    }

    setWeight = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) return

        const value = e.target.value ? parseInt(e.target.value) : 0

        if (this.state.weight != value) {
            this.setState({ weight: value }, this.doCalculation)
        }
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

        this.setState({ result: `Suggested: ${Math.round(minMaxPsi)} psi` })
    }

    render() {
        return (
            <>
                <input key="weight" type="number" min="100" max="250" value={this.state.weight} onChange={e => this.setWeight(e)}></input>
                <select key="terrain" value={this.state.terrain} onChange={e => this.setTerrain(e)}>
                    <option value="road">Road</option>
                    <option value="trail">Trail</option>
                </select>
                <select key="tire" value={this.state.tire} onChange={e => this.setTire(e)}>
                    <option value="slick">Slick</option>
                    <option value="treaded">Treaded</option>
                </select>

                <p key="result">{this.state.result}</p>
            </>
        )
    }
}