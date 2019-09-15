import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';
import firebase from '../firebase';

class EventPage extends Component {
    constructor(){
        super();
        this.state = ({
            event: [],
            newGuest: "",
            guestList: [],
            recipes: [],
            testIngredients: ["3 carrots","2 tomatoes"],
        })
    }

    // problem only saving which url we are at onClick makes it so we cant refresh the page and have the right info show. We only get that value the moment the page is opened. need to solve this.props.match.params!! fuck
    // component did mount- match event clicked to the right directory. Save index to state and use it in file path for firebase? use some variables?
    componentDidMount() {
        const dbRef = firebase.database().ref(`events/${this.props.match.params.partyName}`)

        dbRef.on('value', (data) => {
            const event = data.val();

            const firebaseArray = Object.values(event);
       
            const recipes = Object.values(firebaseArray[2])
    
            this.setState({
                event: firebaseArray,
                guestList: firebaseArray[1].guestList ? firebaseArray[1].guestList : [],
                recipes: firebaseArray[2] ? recipes : [], 
            })
        });
        
    }
    
    // event handler for name input and on submit for sending to firebase
    getNewGuest = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })  
    }

    addGuest = (event) => {
        event.preventDefault();
        
        const copyOfGuests = [...this.state.guestList];

        const makeObject = { name: this.state.newGuest}
        
        copyOfGuests.unshift(makeObject);

        this.setState({
            guestList: copyOfGuests,
        }, () => {
            const dbRef = firebase.database().ref(`events/${this.props.match.params.partyName}/guests`);

            dbRef.update({
                guestList: this.state.guestList,
            })
        })
        
    }

    // test to add ingredients to a guest
    addIngredient = (event) => {
        event.preventDefault();

        const dbRef = firebase.database().ref(`events/${this.props.match.params.partyName}/guests/guestList/1`);

        dbRef.update({
            ingredients: this.state.testIngredients,
        })

    }

  
    render(){
        console.log(this.state.guestList)
        return (
            
            <div className="dashBoard">
                <h1>{this.state.event[0]}</h1>
                {/* <button>
                    Add guests
                </button> */}
                <Link to="/">Home</Link>
                {/* Below link takes user to page where they select recipes */}
                <Link to={`/recipegrid/${this.props.match.params.partyName}`}>Recipes</Link>
                {/* Below link is conditionally rendered if recipe exists.  Will contain an image that is determined by recipes in state. */}
                <Link to="/fullrecipe/:">Full Recipe</Link>
                <form onSubmit={this.addGuest} action="">
                    <label htmlFor="addGuest"></label>
                    {/* Below input adds guest to guest array on event object in Firebase. */}
                    <input onChange={this.getNewGuest} name="newGuest" placeholder="add a new guest one at a time" type="text" id="addGuest"/>
                    <label htmlFor="clickToSubmitGuest"></label>
                    <button id="clickToSubmitGuest">Add guest</button>
                </form>

                <section className="ingredients">
                    <ul>
                    {this.state.recipes ?
                        this.state.recipes.map((recipe, recipeIndex) => {
                            return (recipe.ingredients).map((ingredient, index) => {
                                return <li key={recipeIndex + index}><div>{ingredient}</div></li>
                            })
                
                        })
                        : console.log("fail")}
                    </ul>
                        <button onClick={this.addIngredient}>test</button>
                </section>

                <section className="guests">
                    {this.state.guestList ?
                        // console.log(this.state.guestList)
                        this.state.guestList.map((guest, guestIndex) => {
                            return (
                                <div>
                                    <h3 key={guestIndex}>{guest.name}</h3>
                                    
                                </div> 
                            )
                        })
                         : console.log("fail")}
                </section>


            </div>
        
        );
  }
}
export default EventPage;