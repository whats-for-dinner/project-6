import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

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
    axios({
      url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.idMeal}`,
      method: 'GET',
      dataResponse: 'json'
    }).then(response => {
      const recipe = response.data.meals[0];
      this.setState({
        recipeObject: recipe
      });
      // console.log(this.state.recipeObject);
      {
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

  userSelectionToState = e => {
    e.preventDefault();

    this.setState(
      {
        selectedImage: this.state.recipeObject.strMealThumb,
        selectedTitle: this.state.recipeObject.strMeal
      },
      this.props.sendUserSelectionToState(
        e,
        this.state.finalIngredientsArray,
        this.state.recipeObject.strMealThumb,
        this.state.recipeObject.strMeal
      )
    );
  };

  render() {
    {
      console.log(this.props);
    }
    return (
      <div className="">
        <h2>This is the full recipe page</h2>
        <Link to="/">Home</Link>
        <Link to="/event/:">Event Page</Link>
        <Link to="/recipegrid/:">Recipes</Link>
        <h1>{this.state.recipeObject.strMeal}</h1>
        <img src={this.state.recipeObject.strMealThumb} alt="" />
        {this.state.finalIngredientsArray.map(item => {
          return <p>{item}</p>;
        })}
        <button onClick={this.userSelectionToState}>Add Recipe to Event</button>
      </div>
    );
  }
}
export default FullRecipe;

//strIngredient1
// strMeasure1
