import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import FullRecipe from './components/FullRecipe';
import RecipeGrid from './components/RecipeGrid';
import firebase from './firebase';
import './styles/App.scss';

class App extends Component {

  constructor(){
    super();
    this.state = ({
        events:[],
        createEvent: "",
        currentEvent: "",

    })


}

// function to add new event to Firebase 'event' array as new object.  New object contains all state information with empty strings as key values for any still undetermined info.

  componentDidMount(){
      const dbRef = firebase.database().ref(`events`)

      dbRef.on('value', (data) => {
          const savedEvents = data.val();
          const firebaseArray = Object.values(savedEvents);
          
          this.setState({
              events: firebaseArray,
          })
      });
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
              eventName: this.state.events[0].name,
              guests: [{ name: "", ingredients: [""] }],
              recipes: [{ recipe1: { title: "", img: "", ingredients: [""], directions: "" } }, { recipe: { title: "", img: "", ingredients: [""], directions: "" } }, { recipe3: { title: "", img: "", ingredients: [""], directions: "" } }]
          });
      })
      
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() =>{return <LandingPage event={this.state.events} getEventName={this.getEventName} createEvent={this.createEvent} 
          />}}/>
          {/* <Route path="/contact" render={() =>{return <Contact name="colin" />}}/> */}
          {/* the colon below tells router to expect a parameter. This value is going to be passed in later. */}


          <Route path="/dashboard/:partyName" 
          render={(props) => { 
            return <Dashboard 
                    {...props}
                    event={this.state.events} 
                    currentEvent={this.state.currentEvent}
          />}}/>


          <Route path="/recipegrid/:" component={RecipeGrid} />
          <Route path="/fullrecipe/:" component={FullRecipe} />
        </div>
      </Router>
    );
  }
}
export default App;
