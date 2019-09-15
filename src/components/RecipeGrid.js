import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { link } from 'fs';

class RecipeGrid extends Component {
  constructor() {
    super();
    this.state = {
      userCategory: '',
      userRecipes: []
    };
  }

  updateUserCategory = e => {
    // this function is changing the state as soon as the user selects one of the options (eg. Beef, Seafood, etc)
    this.setState(
      {
        userCategory: e.target.value
      },
      // then it is passing that state, as a param, into a callback function that is an axios call
      () => {
        this.axiosCall(this.state.userCategory);
      }
    );
  };

  // the state is being passed into this axios call as a parameter from the previous call back function
  axiosCall = updatedCategory => {
    axios({
      url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${updatedCategory}`,
      method: 'GET',
      dataResponse: 'json'
    }).then(response => {
      //recipeArray is a placeholder array that is being used to store the recipes that the api retrieves
      // we use a placeholder array so that we can later pass the information into the userRecipes array in state
      // this process is necssary so that we don't manipulate the state directly!
      const recipeArray = [];

      recipeArray.push(response.data.meals);

      this.setState({
        userRecipes: recipeArray[0]
      });
    });
  };

  render() {
    return (
      <div className="">
        <Link to="/">Home</Link>
        <Link to="/event/:">Event Page</Link>
        <h1>Find a recipe</h1>
        <select onChange={this.updateUserCategory} name="" id="">
          <option value="Beef">Beef</option>
          <option value="Chicken">Chicken</option>
          <option value="Dessert">Dessert</option>
          <option value="Lamb">Lamb</option>
          <option value="Pasta">Pasta</option>
          <option value="Pork">Pork</option>
          <option value="Seafood">Seafood</option>
          <option value="Side">Side</option>
          <option value="Starter">Starter</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        {this.state.userRecipes.map((recipe, i) => {
          return (
            <div>
              <ul>
                <li id={recipe.idMeal}>
                  <Link to={`/fullrecipe/${recipe.idMeal}/${this.props.match.params.partyName}`}>
                    <h2>{recipe.strMeal}</h2>
                    <img src={recipe.strMealThumb} />
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}
export default RecipeGrid;
