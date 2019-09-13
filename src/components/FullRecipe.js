import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

let returnedRecipe = []

const FullRecipe = props => {
  axios({
    url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${props.match.params.idMeal}`,
    method: 'GET',
    dataResponse: 'json'
  }).then(response => {
    // response = promise object
    returnedRecipe = (response.data.meals[0]);
  });

  return (
    <div className="">
      <h2>This is the full recipe page</h2>
      <Link to="/">Home</Link>
      <Link to="/event/:">Event Page</Link>
      <Link to="/recipegrid/:">Recipes</Link>
      {<img src={returnedRecipe.strMealThumb} alt=""/>}
    </div>
  );
};
export default FullRecipe;

// {props.match.params.idMeal}
