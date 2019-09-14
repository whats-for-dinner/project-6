import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class FullRecipe extends React.Component {
  constructor() {
    super();
    this.state = {
      recipeObject: ''
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
      console.log(this.state.recipeObject);
    });
  }

  render() {
    return (
      <div className="">
        <h2>This is the full recipe page</h2>
        <Link to="/">Home</Link>
        <Link to="/event/:">Event Page</Link>
        <Link to="/recipegrid/:">Recipes</Link>
        <img src={this.state.recipeObject.strMealThumb} alt="" />
      </div>
    );
  }
}
export default FullRecipe;
