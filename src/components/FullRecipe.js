import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import firebase from '../firebase';

class FullRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      recipeObject: '',
      finalIngredientsArray: [],
      ingredientList: [],
      firebaseIngredients: [],
    };
  }

  componentDidMount() {
    // Make an API call on page load, based on the param (idMeal) that is passed in through the URL, this is why on the FullRecipe.js Route on App.js we destructured {match}, in order to make this work.
    axios({
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.idMeal}`,
      method: 'GET',
      dataResponse: 'json'
    }).then(response => {
      // save the part of the object we need (from response) in the state
      const recipe = response.data.meals[0];
      this.setState({
        recipeObject: recipe
      });
      {
        // this entire section is used to:
        // 1) loop through the response/recipe object 20 times
        // 2) get the measurements and ingredients from the ingredients keys and measurement keys of the response/recipe object
        // 3) push each individual ingredient with its corresponding (identically numbered) measurement in an array and join() them.
        // 4) push this array of joined ingredient and measurement into another finalIngredientsArray.
        //5) Put the finalIngredientArray in state with setState. 
        const finalIngredientsArray = [];

        for (let i = 1; i < 21; i++) {
          let currentItem = [];
          let measurement = [];
          let ingredient = [];

          //ensures that null and empty strings don't get added to a currentItem array, and therefore don't get added to the finalIngredientArray

          if (this.state.recipeObject[`strMeasure${i}`] && this.state.recipeObject[`strMeasure${i}`] !=="") {
            measurement = this.state.recipeObject[`strMeasure${i}`];
            currentItem.push(measurement);
          }

          if (this.state.recipeObject[`strIngredient${i}`] && this.state.recipeObject[`strIngredient${i}`] !=="") {
            ingredient = this.state.recipeObject[`strIngredient${i}`];
            currentItem.push(ingredient);
          }

          //error handling for when ingredients print out e.g. "to serve salt."  Changes to "salt for serving"
          if (currentItem[0] === "to serve"){
            currentItem = [currentItem[1],"for serving"]
          }

          if (currentItem.length !== 0) {
          finalIngredientsArray.push(currentItem.join(' '));
          }

          // finalIngredientsArray.push(currentItem.join(' '));
        }

        this.setState({
          finalIngredientsArray: finalIngredientsArray
        });
      }
    });

    // Grabs the current ingredients for that event in firebase so unassigned ingredient array can be updated on click of select recipe. 
    const dbRefIngredients = firebase
      .database()
      .ref(`events/${this.props.match.params.partyName}/unassignedIngredients`);

    dbRefIngredients.on("value", (data) => {
      const list = data.val();

      this.setState({
        firebaseIngredients: list,
      })

    })

  }

// turns of firebase listener when not on page.
    componentWillMount(){
    const dbRef = firebase.database().ref(`events/${this.props.match.params.partyName}/unassignedIngredients`);

    dbRef.off(); 
  }


  

  sendToFirebase = (event) => {
    event.preventDefault();

    // Sends the whole recipe and ingredient list to the recipe node on firebase.
    const newRecipeObject = {
      recipe: this.state.recipeObject,
      ingredients: this.state.finalIngredientsArray
    };
    
    const dbRef = firebase
      .database()
      .ref(`events/${this.props.match.params.partyName}/recipes`);

    dbRef.update({
      [this.state.recipeObject.strMeal]: newRecipeObject
    });


    // get the ingredients for current recipe
    const newItems = this.state.finalIngredientsArray
    // get the id to add to the recipe object
    const newRecipeId = this.state.recipeObject.idMeal
    // turns them into an object with both keys to keep track of what recipe they belong to
    const itemsToAdd = newItems.map((ingredient) => {
      return {item: ingredient, recipeNumber: newRecipeId}
    })

    // gets the list of things already in firebase
    const list = this.state.firebaseIngredients;
    
    // if the event is new the first item is "dummy" so we need to get rid of it.
    if (list[0] === "dummy") {
      list.splice(list.indexOf("dummy"), 1);
    }
    
    // add the new ingredients array and the existing ingredients array
    const arrayToMerge = [list, itemsToAdd]
    // merges them into one array
    let ingredients = arrayToMerge.reduce(function(a, b) {
      return a.concat(b);
    }, []);

    // sends up to firebase to be rendered on dashboard
    const dbRefIn = firebase.database().ref(`events/${this.props.match.params.partyName}`);
    
    dbRefIn.update({
      unassignedIngredients: ingredients,
    });  
  }

  render() {
    {
      console.log(this.props);
    }
    return (
      <div className='fullRecipe'>
        <header className='mainHeader'>
          <h1>What's For Dinner?</h1>
          <nav>
            <Link to='/' className='link'>
                Home
            </Link>
              <Link
                to={`/dashboard/${this.props.match.params.partyName}`}
                className='link'>
                Event Dashboard
            </Link>
            <Link
                to={`/recipegrid/${this.props.match.params.partyName}`}
                className='link'>
                Recipes
            </Link>
          </nav>
        </header>
        <div className='titleAndPicture'>
          <div className='imageContainer'>
            <img src={this.state.recipeObject.strMealThumb} alt='' />
          </div>
          <div className="recipeTitle">
            <h2>          {this.state.recipeObject.strMeal}</h2>
            <button onClick={this.sendToFirebase}>Save recipe</button>
          </div>
        </div>

        <div className="recipeContainer">
          <div className="ingredientList">
          {this.state.finalIngredientsArray.map(item => {
          	  return <p>{item}</p>;
          	})}
          </div>
          <div className="recipeInstructions">
          	<div className="instruction">
          		<h3>Instructions:</h3>
          		<p>{this.state.recipeObject.strInstructions}</p>
          	</div>
          </div>
        </div>
      </div>
    );
  }
}
export default FullRecipe;
