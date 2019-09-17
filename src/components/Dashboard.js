import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import firebase from '../firebase';

class EventPage extends Component {
  constructor() {
    super();
    this.state = {
      // event from events in firebase
      event: [],
      // for adding guests
      newGuest: "",
      guestList: [],
      // displaying recipe information
      recipes: [],
      remainingIngredients: [],
      // for picking ingredients
      currentGuest: "",
      currentIngredients: []
    };
  }

  componentDidMount() {
    // using the name of the party from the url will match the item in firebase
    const dbRef = firebase
      .database()
      .ref(`events/${this.props.match.params.partyName}`);

    dbRef.on("value", data => {
      const event = data.val();
      // make an array from the object in firebase
      const firebaseArray = Object.values(event);

      const fullRecipes = Object.values(firebaseArray[2]);
      // remove the dummy data so the map doesn't fail
      fullRecipes.pop();

      // map over saved recipes to get the total ingredient list from saved recipes
      // the map produces an array of arrays.
      const remainingIngredients = fullRecipes.map((recipe, index) => {
        return recipe.ingredients.map((ingredients, index) => {
          return ingredients;
        });
      });
      // to combine those arrays into one array
      const ingredients = remainingIngredients.reduce(function(a, b) {
        return a.concat(b);
      }, []);

      // set state with values needed from firebase
      this.setState({
        event: firebaseArray,
        guestList: firebaseArray[1].guestList ? firebaseArray[1].guestList : [],
        recipes: firebaseArray[2] ? fullRecipes : [],
        remainingIngredients: firebaseArray[2] ? ingredients : []
      });
    });
  }

  // event handler for name input to add guest value to state for saving
  getNewGuest = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // adds guest to guest list and then sends the new whole list up to firebase
  addGuest = event => {
    event.preventDefault();

    const copyOfGuests = [...this.state.guestList];
    // makes the guest into an object so ingredients can be added later
    const makeObject = { name: this.state.newGuest };
    // puts the new guest at the start of the list
    copyOfGuests.unshift(makeObject);

    this.setState(
      {
        guestList: copyOfGuests,
        newGuest: ""
      },
      () => {
        const dbRef = firebase
          .database()
          .ref(`events/${this.props.match.params.partyName}/guests`);

        dbRef.update({
          guestList: this.state.guestList
        });
      }
    );
  };


//   finds out which guest is selecting ingredients to add to their list
  currentGuest = event => {
    event.preventDefault();
    const string = event.target.value.toString();
    // retrieves ingredients they already have saved in firebase and puts in "cart" array. so existing ingredients don't get overwritten (in firebase) and also allows users to make changes to their entire list.
    const savedIngredients = this.state.guestList[string].ingredients
      ? [...this.state.guestList[string].ingredients]
      : [];

    this.setState({
      currentGuest: string,
      currentIngredients: savedIngredients
    });
  };

//   for selecting the ingredients to add to their list
  selectIngredient = event => {
    event.preventDefault();

    // get the name of the ingredient to be added
    const name = event.target.value;

    // index so that the ingredient can be removed from the master list
    const index = parseInt(event.target.name, 10);

    // adds the ingredient to the "cart"
    const copyOfIngredients = [...this.state.currentIngredients];
    copyOfIngredients.push(name);

    // removes the ingredient from master list (this is not functional yet as it gets re-rendered from firebase in componentDidMount)
    const availableIngredients = this.state.remainingIngredients;
    availableIngredients.splice(index, 1);

    this.setState({
      currentIngredients: copyOfIngredients,
      remainingIngredients: availableIngredients
    });
  };

//   saving the ingredients to specific guests of that event in firebase.
  addIngredient = event => {
    event.preventDefault();

    const dbRef = firebase.database().ref(`events/${this.props.match.params.partyName}/guests/guestList/${this.state.currentGuest}`);

    dbRef.update({
        ingredients: this.state.currentIngredients
    },() => {
        // clears the selected ingredients for the next user
        this.setState({
          currentIngredients: []
        });
      }
    );
  };

//   to remove item from cart
// if we get delete from master list working- this needs to then add it back 
  removeFromCart = event => {
    event.preventDefault();
    // value comes out as a string of the index
    const ingredient = event.target.value;
    // make it a number
    const index = parseInt(ingredient, 10);

    const copyOfCart = this.state.currentIngredients;
    // remove that item from the "cart"
    copyOfCart.splice(index, 1);

    this.setState({
      currentIngredients: copyOfCart
    });
  };

//   deletes meal from event - will also delete the ingredient list.
// need to make a function that also reaches into each guest and compares values and removes from their saved ingredients.
  deleteMeal = mealId => {
    const dbRef = firebase
      .database()
      .ref(`events/${this.props.match.params.partyName}/recipes`);

    dbRef.child(mealId).remove();
  };

  render() {
    // disable buttons for forms when stuff is incomplete
    const isEnabled = this.state.newGuest.length > 0;
    const cartIsEnabled =
      this.state.currentGuest !== "" && this.state.currentIngredients !== [];

    return (
      <div className="dashBoard">
        <header className="dash">
          <div className="mainHeader">
            <h1>What's For Dinner?</h1>
            <nav>
              <Link to="/">Home</Link>
            </nav>
          </div>
          <h2>{this.state.event[0]}'s dinner party</h2>
        </header>

        <div className="stepOne">
          <div className="rightSideContainer">
            <form onSubmit={this.addGuest} action="">
              <label htmlFor="addGuest" className="labelBorder">Add A Guest:</label>
              {/* Below input adds guest to guest array on event object in Firebase. */}
                <input
                  onChange={this.getNewGuest}
                  name="newGuest"
                  placeholder="Enter the name of your guest"
                  value={this.state.newGuest}
                  type="text"
                  id="addGuest"
                />
                <label className="visuallyHidden" htmlFor="clickToSubmitGuest"></label>
                <button disabled={!isEnabled} id="clickToSubmitGuest">
                  Add guest
                </button>
            </form>
          </div>

          <div className="leftSideContainer">
            {/* Below link takes user to page where they select recipes */}
            <p>Add A Recipe:</p>
            <Link to={`/recipegrid/${this.props.match.params.partyName}`}><button>Find Recipes</button>
            </Link>
          </div>
        </div>

        {/* Maps chosen recipe details to page as a link to the full recipe */}
        <section>

                  <div className="backgroundContainer">
                    <div className="recipesContainer">
                      <div className="yourRecipes">
                        <p>Your recipes:</p>
                      </div>
            {this.state.recipes
            ? this.state.recipes.map((recipe, recipeIndex) => {
                return (
                      <div className="chosenRecipes">
                        <Link
                          key={recipeIndex}
                          to={`/fullrecipe/${recipe.recipe.idMeal}/${this.props.match.params.partyName}`} className="imageLink">
                          <h3>{recipe.recipe.strMeal}</h3>
                          <img
                            src={recipe.recipe.strMealThumb}
                            alt={recipe.recipe.strMeal}
                          />
                        </Link>
                        <button
                          onClick={() => this.deleteMeal(recipe.recipe.strMeal)}
                        >
                          delete
                        </button>
                      </div>
                      );
                  })
              : console.log("fail")}
                    </div>
                  </div>
        </section>
        <div className="stepTwo">
          {/* Maps the master ingredient list to the page */}
          <section className="ingredientsContainer">
          <h3 className="stepTwoHeader">Your Ingredients List</h3>
            <ul className="ingredients">
              {this.state.recipes
                ? this.state.remainingIngredients.map((ingredient, index) => {
                    return (
                      <li key={index} className="buttonContainer">
                        <button
                          name={index}
                          onClick={this.selectIngredient}
                          value={ingredient}
                        >
                          {ingredient}
                        </button>
                      </li>
                    );
                  })
                : console.log("fail")}
            </ul>
          </section>

          <section className="basket">
            {/* form for the "cart" so users can add ingredients to their lists */}
            <h3 className="stepTwoHeader">Who's bringing what?</h3>
            <form action="">
              <label class="visuallyHidden">Please Select a Guest To Add Ingredients To Their Cart</label>
              <select onChange={this.currentGuest} name="" id="">
                {/* map users and save the value of the index number */}
                <option value="">Please Select a Guest</option>
                {this.state.guestList
                  ? this.state.guestList.map((guest, guestIndex) => {
                      return (
                        <option name="currentGuest" value={guestIndex}>
                          {guest.name}
                        </option>
                      );
                    })
                  : console.log("fail")}
              </select>
              <div>
                {/* display what is in their "cart"*/}
                <ul className="addedIngredientContainer">
                  {this.state.currentIngredients
                    ? this.state.currentIngredients.map(
                        (ingredient, ingredientIndex) => {
                          return (
                            <div>
                              <li key={ingredientIndex}>{ingredient}
                              <button
                                value={ingredientIndex}
                                onClick={this.removeFromCart} className="removeButtonStyle"
                              >
                                <i class="far fa-trash-alt"></i>
                              </button>
                              </li>
   
                            </div>
                          );
                        }
                      )
                    : console.log("fail")}
                </ul>
              </div>
              {/* button pushes to firebase */}
              <button disabled={!cartIsEnabled} onClick={this.addIngredient}>
                Save
              </button>
              {!cartIsEnabled ?
                <p className="instructionsMessage">
                  Please Select a Guest To Add Ingredients To Their Cart
                </p> : <p className="instructionsMessage">Click on items from your ingredients list to add them to this guests's cart</p>
               }
              <i class="fas fa-shopping-cart"></i>
            </form>
          </section>
        </div>

        <section className="guests stepThree">
          {this.state.guestList
            ? this.state.guestList.map((guest, guestIndex) => {
                return (
                  <div>
                    <h3 key={guestIndex}>{guest.name}</h3>
                    <ul>
                      {guest.ingredients
                        ? guest.ingredients.map((ingredient, index) => {
                            return <li key={index}> {ingredient}</li>;
                          })
                        : console.log("fail")}
                    </ul>
                  </div>
                );
              })
            : console.log("fail")}
        </section>
      </div>
    );
  }
}
export default EventPage;