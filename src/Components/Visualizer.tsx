import React from 'react'

enum Algo { 
    Insert="insertionSort", 
    Merge="mergeSort",
    Quick="quickSort"
}

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
            arr.map( (val,idx) => 
                <div className='Visualizer__data' key={idx}>
                    {val}
                </div>));
    }

    render() {
        const arr = this.state.array;
        return (
            <div className="Visualizer">
                {this.genArrayBars(arr)}
            </div>
        );
    }

}