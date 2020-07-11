import React from 'react'
import Bar from './Bar'
import Algorithms from '../Algorithms/algorithms'
import { Animate, State } from '../Algorithms/animation' 

enum Algo { Insert,Merge,Quick }

interface VisualizerState {
    numObjects: number;
    algorithm: Algo;
    chart_elms: JSX.Element[];
    data: number[],
    play: boolean
}

export default class Visualizer extends React.Component<{},VisualizerState> {
    constructor(props: any) {
        super(props);
        this.state = {
            numObjects: 100,
            algorithm: Algo.Insert,
            chart_elms: [],
            data: [],
            play: true
        };
    }

    componentDidMount() {
        this.newArray(this.state.numObjects)
        // for testing 
        setTimeout(this.animate.bind(this), 1000)
    }

    newArray(size: number) {
        const arr = [];
        for(let i = 0; i < size; i++)
            arr.push(Math.floor(Math.random()*(1000-5)+5));
        this.setState({data: arr})
        this.genArrayBars(arr)
    }

    genArrayBars(arr: number[]) {
        this.setState ({chart_elms: arr.map( (val,idx) => 
            <Bar value={val} animation={State.Unsorted} key={idx} />)});
    }

    animate() {
        if (this.state.play === true) {
            let animations = Algorithms[this.state.algorithm](this.state.data)
            let barElms = document.getElementsByClassName('Bar') as HTMLCollectionOf<HTMLElement>
            let id = setInterval(() => {
                if (animations.length) {
                    let ani_state = animations.shift() as Animate
                    let idx = ani_state.getIdx()
                    barElms[idx].style.backgroundColor=ani_state.getAnimation()
                    barElms[idx].style.height = (ani_state.getVal()/10) + '%'    
                } else {
                    clearInterval(id)
                }
            }, 1)
        }
    }



    render() {
        return (
            <div className="Visualizer">
                <div className="Visualizer__wrapper">
                    {this.state.chart_elms}
                </div>
            </div>
        );
    }

}