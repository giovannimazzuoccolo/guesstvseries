import React, { Component } from 'react';
import Show from './components/show.js';


class App extends Component {
  render() {
    return (
    <div>
      <h1>Guess the Tv Series</h1>
      <div className="App">
         <Show />
      </div>
     </div>
    );
  }
}

export default App;
