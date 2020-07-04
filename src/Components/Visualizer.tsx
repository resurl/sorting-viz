import React from 'react'
import Data from './Data'

enum Algo { Insert,Merge,Quick }

interface VisualizerState {
    numObjects: number;
    algorithm: Algo;
    array: number[];
}

export default class Visualizer extends React.Component<{},VisualizerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            numObjects: 10,
            algorithm: Algo.Insert,
            array: []
        };
    }

    componentDidMount() {
        this.newArray(this.state.numObjects)
    }

    newArray(size: number) {
        const arr = [];
        for(let i = 0; i < size; i++)
            arr.push(Math.floor(Math.random()*(1000-5)+5));
        this.setState({array:arr});
    }

    genArrayBars(arr: number[]) {
        return (
            arr.map( (val) => 
                <Data value={val} />));
    }



    render() {
        const arr = this.state.array;
        return (
            <div className="Visualizer">
                <div className="Visualizer__wrapper">
                    {this.genArrayBars(arr)}
                </div>
            </div>
        );
    }

}