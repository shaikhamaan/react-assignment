import React from 'react';
import './App.css';
import Frames from './Components/Frames';
import Buttons from './Buttons';

const App = () => {

  return (
    <div className="App">
      <h1>Test App</h1>
      <div className="Frames">
        <Frames />
        <Frames />
        <Frames />
        <Frames />
      </div>
      <div className="Buttons">
        <Buttons number="1" />
        <Buttons number="2"/>
        <Buttons number="3"/>
        <Buttons number="4"/>
      </div>
    </div>
  );
}

export default App;