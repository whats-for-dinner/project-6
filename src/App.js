import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import RecipeGrid from './components/RecipeGrid';
import FullRecipe from './components/FullRecipe';
import firebase from './firebase';
import './styles/App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = ({
        events:[],
        createEvent: "",
        errorMessage:""
    })

  }
  // function to add new event to Firebase 'event' array as new object.  New object contains all state information with empty strings as key values for any still undetermined info.

  componentDidMount() {
    const dbRef = firebase.database().ref(`events`);

    dbRef.on('value', data => {
      const savedEvents = data.val();
      const firebaseArray = Object.values(savedEvents);

      this.setState({
        events: firebaseArray ? firebaseArray : []
      });
    });
  }

  // this function is for receiving the on change on the input and setting it to state
  getEventName = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  // this function runs on Submit
  createEvent = () => {
    // event.preventDefault();

    if(this.state.createEvent !== "") {
    // taking the events array in state and copying it
      const copyOfEvents = [...this.state.events];
      // this is putting the input we saved in state into an object
      const makeObject = { name: this.state.createEvent };
      // we are pushing the object to the copy of the array in state
      copyOfEvents.unshift(makeObject);
      // updating the state of events to the new version of the array
      this.setState(
        {
          events: copyOfEvents
        },
        () => {
          // sending new event object to firebase - asynchronous callback
          const dbRef = firebase
            .database()
            .ref(`events/${this.state.events[0].name}`);
          dbRef.set({
            eventName: this.state.events[0].name,
            guests: {dummy: 0},
            recipes: { dummy: 0 },
            unassignedIngredients: ["dummy"]
          });
        }
      );
    } 
    else 
    {
      this.setState({
        errorMessage: "Please enter a name for your event before clicking submit"
      })
    }
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() =>{return <LandingPage event={this.state.events} getEventName={this.getEventName} createEvent={this.createEvent} errorMessage={this.state.errorMessage} errorMessage2={this.state.errorMessage2} createEventName={this.state.createEvent} 
          />}}/>
          {/* <Route path="/contact" render={() =>{return <Contact name="colin" />}}/> */}
          {/* the colon below tells router to expect a parameter. This value is going to be passed in later. */}


          <Route path="/dashboard/:partyName" 
          render={(props) => { 
            return <Dashboard 
                    {...props}
                    event={this.state.events} 
          />}}/>


          <Route path="/recipegrid/:partyName" component={RecipeGrid} />
          {/* the below Route is saying: whenever the URL reads fullrecipe/(something),render the FullRecipeComponent.  But so that we can use info from that URL *in* the FullRecipe component, include a parameter so that that parameter can be accessed in the component.  In this case the 'idMeal' parameter tells the FullRecipe component where to look for props.match.params.idMeal.  It will look for this value by looking to the URL.  And since the URL is an ID number, it will use this ID to do its Axios call. */}
          <Route
            path="/fullrecipe/:idMeal/:partyName"
            render={({ match }) => {
              return (
                <FullRecipe
                  sendUserSelectionToState={this.sendUserSelectionToState}
                  match={match}
                />
              );
            }}
          />
        </div>
      </Router>
    );
  }
}
export default App;
