import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import heroImage from '../images/heroImage.png'
import firebase from '../firebase';




const LandingPage = (props) => {

    const checkName = () => {
        const eventNames = []
        (props.event).forEach((object)=> {
            eventNames.push(object.name)
        })
        (eventNames.includes(`${props.createEventName}`))? true : false;
        //forEach loop over props.event array and pull out each object.name value to create an array of eventNames
        //if eventNames.includes(`${props.createEventName}`) then
        //return true else return false
    }
  
    return (
    
        <div className="landingPage">
            <header className="landingHeader">
                <h1>What's For Dinner?</h1>

            </header>
            <section className="start">
                <div className="wrapper startContainer">
                    <div className="tagLine">
                        <h2>We help you organize Dinner Parties</h2>
                    </div>
                    <div className="startForm">
                        <form 
                        // onSubmit={this.pushToFirebase} 
                        onSubmit={
                            checkName ? props.createEvent : <p>An event with that name already exists.  Please select a different name.</p>

                            // run checkfunction.  if checkfunction is negative, run props.createEvent, otherwise return a message.
                        }
                        action=""> 
                            {props.errorMessage !=='' ? <p>{props.errorMessage}</p> : null}
                            <input onChange={props.getEventName} name="createEvent" className="createEvent" type="text" placeholder="enter your group name"/>
                            <label htmlFor="createEvent" className="visuallyHidden">Enter your group name</label>
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
                                    <li key={eventIndex} >
                                        <Link to={`/dashboard/${userEvents.eventName}`} 
                                        >{userEvents.eventName}</Link>
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