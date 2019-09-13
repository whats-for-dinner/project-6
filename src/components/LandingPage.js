import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import firebase from '../firebase';



class LandingPage extends Component {

    constructor(){
        super();
        this.state = ({
            events:[],
            createEvent: "",

        })


    }

    // function to add new event to Firebase 'event' array as new object.  New object contains all state information with empty strings as key values for any still undetermined info.

    componentDidMount(){

    }

    // this function is for receiving the on change on the input and setting it to state
    getEventName = (event) => {
        this.setState({
            [event.target.name]: event.target.value,   
        }) 

    };

    // this function runs on Submit
    createEvent = (event) => {
        event.preventDefault();
        // taking the events array in state and copying it
        const copyOfEvents = [...this.state.events];
        // this is putting the input we saved in state into an object
        const makeObject = {name: this.state.createEvent}
        // we are pushing the object to the copy of the array in state
        copyOfEvents.unshift(makeObject);
        // updating the state of events to the new version of the array
        this.setState({
            events: copyOfEvents,
        }, () => {
            // sending new event object to firebase - asynchronous callback
            const dbRef = firebase.database().ref(`events/${this.state.events[0].name}`);
            dbRef.set({
                guests: [{ name: "", ingredients: [""] }],
                recipes: [{ recipe1: { title: "", img: "", ingredients: [""], directions: "" } }, { recipe: { title: "", img: "", ingredients: [""], directions: "" } }, { recipe3: { title: "", img: "", ingredients: [""], directions: "" } }]
            });
        })
        
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
                    <form 
                    // onSubmit={this.pushToFirebase} 
                    onSubmit={this.createEvent}
                    action="">
                        <input onChange={this.getEventName} name="createEvent" className="createEvent" type="text"/>
                        <button>
                            Submit
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