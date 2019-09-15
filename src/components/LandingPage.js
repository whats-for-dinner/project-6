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
                    <div className="tagLine">
                        <h2>We help you organize Dinner Parties</h2>
                    </div>
                    <div className="startForm">
                        <form 
                        // onSubmit={this.pushToFirebase} 
                        onSubmit={props.createEvent}
                        action="">
                            <input onChange={props.getEventName} name="createEvent" className="createEvent" type="text" placeholder="enter your group name"/>
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
                <div className="wrapper">
                    <div>
                        <h2>Events</h2>
                        <h3>Find your dinner party</h3>
                    </div>
                    <ul>
                        {/* map through this.state.events and return events to page as <li> elements in <Link>s. */}
                        {/* {props["event"] ?console.log(props["event"][0]):console.log('null')} */}
                        {props.event?
                            props.event.map((userEvents, eventIndex) => {
                                return (
                                    // console.log(userEvents.eventName)
                                    <li>
                                        <Link to={`/dashboard/${userEvents.eventName}`} 
                                        key={eventIndex}>{userEvents.eventName}</Link>
                                    </li>
                                )
                            }
                        ):null}
                    </ul>
                </div>
            </section>
        </div>
    
    );
  
}
export default LandingPage;