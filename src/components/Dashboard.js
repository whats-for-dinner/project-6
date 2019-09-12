import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

class EventPage extends Component {
  
    render(){
    
        return (
        
            <div className="">
                <h1>(Name of event)</h1>
                <button>
                    Add guests
                </button>
                <Link to="/">Home</Link>
                {/* Below link takes user to page where they select recipes */}
                <Link to="/recipegrid/:">Recipes</Link>
                {/* Below link is conditionally rendered if recipe exists.  Will contain an image that is determined by recipes in state. */}
                <Link to="/fullrecipe/:">Full Recipe</Link>
                <form action="">
                    <label htmlFor="addGuest"></label>
                    Below input adds guest to guest array on event object in Firebase.
                    <input type="text" id="addGuest"/>
                    <label htmlFor="clickToSubmitGuest"></label>
                    <button id="clickToSubmitGuest">Add guest</button>
                </form>
            </div>
        
        );
  }
}
export default EventPage;