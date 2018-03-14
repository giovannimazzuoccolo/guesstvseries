import React, { Component } from 'react';
import Show from './components/show.js';
import './App.css';

class App extends Component {
  render() {
    return (
    <div className="container">
      <h1 className='push-center'>Guess the Tv Series</h1>
      <div className='col-6 offset-3'>
         <Show />
      </div>
     </div>
    );
  }
}

export default App;
