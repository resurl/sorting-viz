import Algorithms from '../Algorithms/algorithms'
import { Animate, State } from '../Algorithms/animation' 
import Bar from './Bar'
import React from 'react'

interface VisualizerProps {
    scale: number,
    algo: number,
    play: boolean,
    reset: boolean
}

interface VisualizerState {
    data: number[],
    bars: JSX.Element[],
    positions: number[]
}

const begColor = '#336aeb',
    begGreen = 0x6a,
    endGreen = 0xeb

const colorMap = (idx: number, len: number, state: State): string => {
    if (state === State.Unsorted) {
        let gap = (endGreen - begGreen) / len,
            base = begColor,
            greenDiff = idx*gap,
            greenMap = Math.floor(parseInt(base.substr(3,2),16) + greenDiff),
            color = base.substr(0,3) + greenMap.toString(16) + base.substr(5,2)
        return color
    }
    else {
        return state
    }
} 

export default class Visualizer extends React.Component<VisualizerProps,VisualizerState> {
    constructor(props: any) {
        super(props)
        this.state = {
            data: [],
            bars: [],
            positions: []
        }

        this.newArray = this.newArray.bind(this)
        this.genArrayBars = this.genArrayBars.bind(this)
        this.animate = this.animate.bind(this)
    }
    componentDidMount() {
        this.newArray(this.props.scale)
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
        // get a sorted array so that we can know where they lie after being sorted
        let sorted = arr.slice();
        let copy = arr.slice()
        sorted = sorted.sort((a,b) => a-b);
        let pos = copy.map( (val) => sorted.indexOf(val))
        this.setState({positions: pos}) 
        
        // generate the JSX
        // color mapping should be relative to its height/position relative to its sorted self
        let res = arr.map( (val,idx) => 
        <Bar value={val} animation={colorMap(sorted.indexOf(val),arr.length,State.Unsorted)} key={idx} />);
        this.setState({bars: res})
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
                let curr = ani_state.current
                let idx = ani_state.index
                let posis = this.state.positions
                barElms[curr].style.backgroundColor=colorMap(posis[idx],barElms.length,ani_state.state);
                barElms[curr].style.height = (ani_state.val/10) + '%'    
            } else {
                for (let i = 0; i <buttons.length; i++)
                    buttons[i].disabled = false
                clearInterval(id)
            }
        }, 10) 


    }

    render() {
        return (
            <div className="Visualizer">
                <div className="Visualizer__wrapper">
                    {this.state.bars}
                </div>
            </div>
        );
    }

} 
