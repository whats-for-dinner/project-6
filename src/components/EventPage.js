import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

class EventPage extends Component {
  
    render(){
    
        return (
        
            <div className="">
                <Link to="/">Home</Link>
                <Link to="/recipegrid/:">Recipes</Link>
                <Link to="/fullrecipe/:">Full Recipe</Link>
                <h1>This is the event page</h1>
            </div>
        
        );
  }
}
export default EventPage;