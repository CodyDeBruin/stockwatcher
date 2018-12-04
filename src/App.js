import React, { Component } from 'react';
import { Dashboard } from './components/dashboard/dashboard'
import './App.css';



class App extends Component {
  render() {
    return (
      <section className="App">
          <Dashboard></Dashboard>
      </section>
    );
  }
}

export default App;
