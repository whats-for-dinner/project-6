import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

class LandingPage extends Component {
  
    render(){
    
        return (
        
            <div className="">
                <header className="">
                    <h1>What's For Dinner?</h1>
                    <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/event/:">Event Page</Link></li>
                    </ul>
                    </nav>
                </header>
            </div>
        
        );
  }
}
export default LandingPage;