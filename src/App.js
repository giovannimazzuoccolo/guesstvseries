import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Show from './components/show';
import './App.css';
import store from './store/index';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
       <h1 className="push-center">Guess the Tv Series</h1>
       <div className="col-6 offset-3">
        <Show />
      </div>
     </div>
      </Provider>
    );
  }
}

export default App;
