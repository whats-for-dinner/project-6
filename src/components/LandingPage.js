import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import heroImage from '../images/heroImage.png';
import firebase from '../firebase';
import {Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';





class LandingPage extends Component {
    constructor() {
        super() 
        this.state = {
            userIsDuplicate: false,
        }
    }
    
    checkName = (e) => {
        e.preventDefault();
        const message = () => this.setState
        const eventNames = [];
    
        (this.props.event).forEach((object)=> {
            eventNames.push(object.eventName);
        });
        // returns true if there is a duplicate
        eventNames.includes(`${this.props.createEventName}`)? this.setState({
            userIsDuplicate: !this.state.userIsDuplicate
        }) : this.props.createEvent();
        //forEach loop over props.event array and pull out each object.name value to create an array of eventNames
        //if eventNames.includes(`${props.createEventName}`) then
        //return true else return false
    }

    moveToSection = () => {
        scroller.scrollTo('events', {
            duration: 1500,
            delay: 20,
            smooth: "easeInOutQuint",
        });
    }

    render(){
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
                            onSubmit={this.checkName}
                            action=""> 
                                {this.props.errorMessage !=='' ? <p>{this.props.errorMessage}</p> : null}
                                <input onChange={this.props.getEventName} name="createEvent" className="createEvent" type="text" placeholder="enter your group name"/>
                                <label htmlFor="createEvent" className="visuallyHidden">Enter your group name</label>
                                <div className="buttons">
                                    <button className="submit">
                                        Submit
                                        {/* This button creates a new event object in the events array AND links to event page. */}
                                    </button>      
                                    <p>or</p>
                                    <div className="skipToEvents"
                                    onClick={this.moveToSection}>
                                        <p>Skip</p>
                                        {/* link to events (scroll) */}
                                    </div>
                                </div>
                            </form>
                            {this.state.userIsDuplicate ? <p>User already exists</p> : null}
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
                            {this.props.event?
                                this.props.event.map((userEvents, eventIndex) => {
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
        )
   };  
  
}
export default LandingPage;