import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class FullRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      recipeObject: '',
      finalArray: []
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
        const finalArray = [];

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

          finalArray.push(currentItem.join(' '));
        }

        this.setState({
          finalArray: finalArray
        });
      }
    });
  }

  render() {
    return (
      <div className="">
        <h2>This is the full recipe page</h2>
        <Link to="/">Home</Link>
        <Link to="/event/:">Event Page</Link>
        <Link to="/recipegrid/:">Recipes</Link>
        <h1>{this.state.recipeObject.strMeal}</h1>
        <img src={this.state.recipeObject.strMealThumb} alt="" />
        {this.state.finalArray.map(item => {
          return <p>{item}</p>;
        })}
      </div>
    );
  }
}
export default FullRecipe;

//strIngredient1
// strMeasure1
