import React, { Component } from 'react';
import {BrowserRouter } from 'react-router-dom';
import MainComponent from './components/MainComponent.js';
import HomePage from './components/HomePage.js';
import './App.css';
import {Provider} from 'react-redux';
import allReducers from './reducers/reducersAll';
import {createStore} from 'redux';
import PropTypes from 'prop-types';
const store = createStore(allReducers);

class App extends Component {
  render() {
    return (  
         <div className="App" >
             <Provider store={store}>
                    <BrowserRouter>
                        <HomePage/>
                    </BrowserRouter>
             </Provider>
                </div>
    );
  }
}

export default App;
