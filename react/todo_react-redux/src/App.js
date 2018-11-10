import React, { Component } from 'react';
import { Link, Route, Switch, Redirect } from 'react-router-dom';
import TodoList from './TodoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to the To-do App</h1>
        <p>
            <Link to='/todos'>See my todos</Link>
        </p>
        <p>
            <Link to='/todos/new'>Add a todo</Link>
        </p>
        <Switch>
            <Route path='/todos' component={TodoList}/>
            <Route exact path='/' render={() => <Redirect to='/todos'/>}/>
        </Switch>
      </div>
    );
  }
}

export default App;
