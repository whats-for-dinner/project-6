import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import heroImage from '../images/heroImage.png'
import firebase from '../firebase';



const LandingPage = (props) => {
  
    return (
    
        <div className="landingPage">
            <header className="landingHeader">
                <h1>What's For Dinner?</h1>
                {/* <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/event/:">Event Page</Link></li>
                    </ul>
                </nav> */}
            </header>
            <section className="start">
                <div className="wrapper startContainer">
                    <div className="startForm">
                        <form 
                        // onSubmit={this.pushToFirebase} 
                        onSubmit={props.createEvent}
                        action="">
                            <input onChange={props.getEventName} name="createEvent" className="createEvent" type="text"/>
                            <button className="submit">
                                Submit
                                {/* This button creates a new event object in the events array AND links to event page. */}
                            </button>      
                        </form>
                        <p>or</p>
                        <button className="skipToEvents">
                            Skip
                            {/* link to events (scroll) */}
                        </button>
                    </div>
                </div>
            </section>
            <section className="events">
                {/* map through this.state.events and return events to page as <li> elements in <Link>s. */}
                {/* {props["event"] ?console.log(props["event"][0]):console.log('null')} */}
                {props.event?
                    props.event.map((userEvents, eventIndex) => {
                        return (
                            // console.log(userEvents.eventName)
                            <Link to={`/dashboard/${userEvents.eventName}`} 
                            key={eventIndex}>{userEvents.eventName}</Link>
                        )
                    }
                ):null}

            </section>
        </div>
    
    );
  
}
export default LandingPage;