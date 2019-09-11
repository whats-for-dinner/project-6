import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import LandingPage from './LandingPage';
import EventPage from './EventPage';
import FullRecipe from './FullRecipe';
import RecipeGrid from './RecipeGrid';
import './App.css';

class App extends Component {
  
    render(){
    
    
    return (
      <Router>
        <div className="App">
          <header className="">
            <h1>What's For Dinner?</h1>
            <nav>
              <Link to="/">Home</Link>
            </nav>
          </header>
          <Route exact path="/" component={LandingPage} />
            {/* the colon below tells router to expect a parameter. This value is going to be passed in later. */}
          <Route path="/dashboard/:" component={EventPage} />
          <Route path="/recipegrid/:" component={RecipeGrid} />
          <Route path="/fullrecipe/:" component={FullRecipe} />

        </div>
      </Router>
    );
  }
}
export default App;
