import Algorithms from '../Algorithms/algorithms'
import { Animate, State } from '../Algorithms/animation' 
import Bar from './Bar'
import React, { useState, useEffect } from 'react'

interface VisualizerProps {
    scale: number,
    algo: number,
    play: boolean,
    reset: boolean
}

interface VisualizerState {
    data: number[],
    bars: JSX.Element[]
}

export default class Visualizer extends React.Component<VisualizerProps,VisualizerState> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: [],
            bars: []
        }

        this.newArray = this.newArray.bind(this)
        this.genArrayBars = this.genArrayBars.bind(this)
        this.animate = this.animate.bind(this)
    }
    componentDidMount() {
        this.newArray(this.props.scale)
        // for testing 
        // setTimeout(this.animate.bind(this), 1000)
    }

    componentDidUpdate(prevProps: any) {
        let playUpdated = (this.props.play !== prevProps.play)
        let resetUpdated = (this.props.reset !== prevProps.reset)
        if (playUpdated && this.props.play) {
            this.animate()
        } else if (resetUpdated && this.props.reset && !playUpdated) {
            this.newArray(this.props.scale)
        }
    }

    newArray(size: number) {
        const arr = [];
        for(let i = 0; i < size; i++)
            arr.push(Math.floor(Math.random()*(1000-5)+5));
        this.setState({data: arr})
        this.genArrayBars(arr)
    }

    genArrayBars(arr: number[]) {
        /* return arr.map( (val,idx) => 
            <Bar value={val} animation={State.Unsorted} key={idx} />); */
        let res = arr.map( (val,idx) => 
        <Bar value={val} animation={State.Unsorted} key={idx} />);
        this.setState({bars: res})
        
        let barElms = document.getElementsByClassName('Bar') as HTMLCollectionOf<HTMLElement>
        for (let i = 0; i < barElms.length; i++)
            barElms[i].style.backgroundColor = '#9c9c9c'
    }

    animate() {
        let animations = Algorithms[this.props.algo](this.state.data)
        let buttons = document.getElementsByClassName('Button') as HTMLCollectionOf<HTMLButtonElement> 
        for (let i = 0; i < buttons.length; i++)
            buttons[i].disabled = true
        let barElms = document.getElementsByClassName('Bar') as HTMLCollectionOf<HTMLElement>
        let id = setInterval(() => {
            if (animations.length) {
                let ani_state = animations.shift() as Animate
                let idx = ani_state.getIdx()
                barElms[idx].style.backgroundColor=ani_state.getAnimation()
                barElms[idx].style.height = (ani_state.getVal()/10) + '%'    
            } else {
                for (let i = 0; i <buttons.length; i++)
                    buttons[i].disabled = false
                clearInterval(id)
            }
        }, 1) 


    }

    render() {
        //const bars = this.genArrayBars(this.state.data)
        return (
            <div className="Visualizer">
                <div className="Visualizer__wrapper">
                    {this.state.bars}
                </div>
            </div>
        );
    }

} 
