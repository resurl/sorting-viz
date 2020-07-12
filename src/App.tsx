import React from 'react';
import Visualizer from './Components/Visualizer'
import Button from './Components/Toolbar/Button';
import AlgorithmSelect from './Components/Toolbar/AlgorithmSelect'
import ScaleSlider from './Components/Toolbar/ScaleSlider'
import Algorithms from './Algorithms/algorithms'
import { Animate } from './Algorithms/animation'
import './App.css';
import './Styles/main.css'

enum Algo { Insertion, Merge, Quick }

interface AppState {
  numObjects: number,
  algorithm: Algo,
  play: boolean,
  reset: boolean
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      numObjects: 25,
      algorithm: Algo.Insertion,
      play: false,
      reset: false
    }
    this.handlePlay = this.handlePlay.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleAlgorithm = this.handleAlgorithm.bind(this)
    this.handleScale = this.handleScale.bind(this)
  }
    
  handlePlay(fn: Function) {
    this.setState({play: true})
    setTimeout( () => this.setState({play: false}),500)
  }

  handleReset(fn: Function) {
    this.setState({reset: true, play: false})
    setTimeout( () => this.setState({reset: false}), 500)
  }

  handleScale(val: number) {
    this.setState({ numObjects: val })
  }

  handleAlgorithm() {
    // when selected algorithm is changed, change state's algorithm accordingly
  }


  render() {
    const numObjects = this.state.numObjects
    const algorithm = this.state.algorithm
    const play = this.state.play
    const reset = this.state.reset

    const optionBar = (
      <div className="OptionBar">
        <ScaleSlider onScaleChange={this.handleScale} value={numObjects} />
        <AlgorithmSelect onAlgoChange={this.handleAlgorithm} /> 
        <Button behaviour='Reset' clickCallback={this.handleReset} /> 
        <Button behaviour='Play' clickCallback={this.handlePlay} /> 
      </div>
    )

    return (
      <div className="App">
        {optionBar}
        <Visualizer scale={numObjects} algo={algorithm} play={play} reset={reset} />
      </div>
    )
  }
}

export default App;
