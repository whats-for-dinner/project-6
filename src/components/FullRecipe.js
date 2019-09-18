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

  

  sendToFirebase = (event) => {
    event.preventDefault();

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

    const newItems = this.state.finalIngredientsArray
    const newRecipeId = this.state.recipeObject.idMeal

    const itemsToAdd = newItems.map((ingredient) => {
      return {item: ingredient, recipeNumber: newRecipeId}
    })

    console.log(itemsToAdd)

    const list = this.state.firebaseIngredients;
    const arrayToMerge = [list, itemsToAdd]

    console.log(arrayToMerge)

    const ingredients = arrayToMerge.reduce(function(a, b) {
      return a.concat(b);
    }, []);
    ingredients.shift();
    console.log(ingredients)

    // this.setState({
    //   ingredientList: ingredients,
    //   })
    const dbRefIn = firebase
          .database()
          .ref(`events/${this.props.match.params.partyName}`);
    
        dbRefIn.update({
          unassignedIngredients: ingredients,
        });  

    // const dbRefIn = firebase
    //       .database()
    //       .ref(`events/${this.props.match.params.partyName}`);
    
    //     dbRefIn.update({
    //       unassignedIngredients: ["fuck you infinite loop"]
    //     });  




  }

  render() {
    {
      console.log(this.props);
    }
    return (
      <div className=''>
        <header>
          <h1>Full Recipes</h1>
        </header>
        <div className='navContainer'>
          <button onClick={this.sendToFirebase}>Save recipe</button>
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
        </div>
        <div className='imageAndTitleContainer'>
          <h2>{this.state.recipeObject.strMeal}</h2>
          <img src={this.state.recipeObject.strMealThumb} alt='' />
        </div>
        {this.state.finalIngredientsArray.map(item => {
          return <p>{item}</p>;
        })}
        <p>{this.state.recipeObject.strInstructions}</p>
      </div>
    );
  }
}
export default FullRecipe;
