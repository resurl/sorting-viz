import React from 'react';
import Visualizer from './Components/Visualizer'
import OptionBar from './Components/Toolbar/OptionBar'
import ResetButton from './Components/Toolbar/ResetButton';
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
