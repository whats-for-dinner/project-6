import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';



class LandingPage extends Component {

    constructor(){
        super();
        this.state = ({
            events:[]
        })


    }

    // function to add new event to Firebase 'event' array as new object.  New object contains all state information with empty strings as key values for any still undetermined info.

    componentDidMount(){

    //function that grabs events array on firebase and updates array 'events' in this.state.

    }
  
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
                <section className="startForm">
                    <form action="">
                        <input className="createEvent" type="text"/>
                        <button>
                            {/* This button creates a new event object in the events array AND links to event page. */}
                        </button>      
                    </form>
                    <button>
                        {/* link to events (scroll) */}
                    </button>
                </section>
                <section className="events">
                    {/* map through this.state.events and return events to page as <li> elements in <Link>s. */}
                </section>
            </div>
        
        );
  }
}
export default LandingPage;