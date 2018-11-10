import React, { Component } from 'react';
import Navigation from './components/nav';
import RecipeList from './components/recipe-list';
import './RecipeApp.css';

class RecipeApp extends Component {
  render() {
      return (
          <div className="App">
              <Navigation />
              <RecipeList />
          </div>
      );
  }
}

export default RecipeApp;
