import React from 'react';
import './App.css';
import Home from './Components/Home';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {}
    window.ethereum.autoRefreshOnNetworkChange = false
  }

  render() {
    return (
      <div className="App">
        <Home />
        <div className="TailBackground">
        </div>
        <div className="DotsBackground">
        </div>
      </div>
    );
  }

}

export default App;
