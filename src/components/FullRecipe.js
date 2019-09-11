import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

class FullRecipe extends Component {
  
    render(){
    
        return (
        
            <div className="">
                <h1>This is the full recipe page</h1>
                <Link to="/">Home</Link>
                <Link to="/event/:">Event Page</Link>
                <Link to="/recipegrid/:">Recipes</Link>
            </div>
        
        );
  }
}
export default FullRecipe;