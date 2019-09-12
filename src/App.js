import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import FullRecipe from './components/FullRecipe';
import RecipeGrid from './components/RecipeGrid';
import './styles/App.scss';

class App extends Component {
  
    render(){
    
    
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={LandingPage} />
            {/* the colon below tells router to expect a parameter. This value is going to be passed in later. */}
          <Route path="/dashboard/:" component={Dashboard} />
          <Route path="/recipegrid/:" component={RecipeGrid} />
          <Route path="/fullrecipe/:" component={FullRecipe} />

        </div>
      </Router>
    );
  }
}
export default App;
