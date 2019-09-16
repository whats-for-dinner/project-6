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
      selectedImage: '',
      selectedTitle: ''
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
        // 1) loop through the response object
        // 2) get the measurements and ingredients the recipe selected
        // 3) join each individual ingredient with its measurement as array items
        // 4) assign this array of coupled ingredients and measurements into state via setstate
        const finalIngredientsArray = [];

        for (let i = 1; i < 21; i++) {
          let currentItem = [];
          let measurement = [];
          let ingredient = [];

          if (this.state.recipeObject[`strMeasure${i}`]) {
            measurement = this.state.recipeObject[`strMeasure${i}`];
            currentItem.push(measurement);
          }

          if (this.state.recipeObject[`strIngredient${i}`]) {
            ingredient = this.state.recipeObject[`strIngredient${i}`];
            currentItem.push(ingredient);
          }

          finalIngredientsArray.push(currentItem.join(' '));
        }

        this.setState({
          finalIngredientsArray: finalIngredientsArray
        });
      }
    });
  }

  // userSelectionToState = e => {
  //   e.preventDefault();

  //   this.setState(
  //     {
  //       selectedImage: this.state.recipeObject.strMealThumb,
  //       selectedTitle: this.state.recipeObject.strMeal
  //     },
  //     this.props.sendUserSelectionToState(
  //       e,
  //       this.state.finalIngredientsArray,
  //       this.state.recipeObject.strMealThumb,
  //       this.state.recipeObject.strMeal
  //     )
  //   );
  // };

  sendToFirebase = (event) => {
    event.preventDefault();

    const newRecipeObject = {recipe: this.state.recipeObject, ingredients: this.state.finalIngredientsArray}

    const dbRef = firebase.database().ref(`events/${this.props.match.params.partyName}/recipes`)

    dbRef.update({
      [this.state.recipeObject.strMeal]: newRecipeObject,
    })


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
        <button onClick={this.sendToFirebase}>Add Recipe to Event</button>
      </div>
    );
  }
}
export default FullRecipe;
