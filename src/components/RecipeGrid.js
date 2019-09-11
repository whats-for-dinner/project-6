import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

class RecipeGrid extends Component {
  
    render(){
    
        return (
        
            <div className="">
                <h1>This is the recipe grid page</h1>
                <Link to="/">Home</Link>
                <Link to="/event/:">Event Page</Link>
                <Link to="/fullrecipe/:">Full Recipe</Link>
            </div>
        
        );
  }
}
export default RecipeGrid;