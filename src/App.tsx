import React from 'react';
import Visualizer from './Components/Visualizer'
import OptionBar from './Components/OptionBar'
import './App.css';
import './Styles/main.css'

function App() {
  return (
    <div className="App">
      <OptionBar />
      <Visualizer />
    </div>
  );
}

export default App;
