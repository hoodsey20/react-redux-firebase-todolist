import React, { Component } from 'react';

import './App.css';
import TaskList from './containers/TaskList';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">
        <div className="App__wrapper">
          <TaskList />
        </div>
      </div>
    );
  }
}

export default App;
