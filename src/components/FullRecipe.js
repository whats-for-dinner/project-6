import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

const returnedRecipe = []

// getRecipeObject()




class FullRecipe extends React.Component {
  constructor(){
    super();
    this.state = {
      recipeId:'',
      recipeName: '',
      recipeIngredients: '',
      recipeDirections: '',
      recipeImage:''
    }
  }

  
  // returnedRecipe.length = 0;
  // console.log(returnedRecipe);
  componentDidMount(){

    console.log(this.props)
    // console.log(this.props.match.params.idMeal)
    const getRecipeById = (id) =>
      axios({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        method: 'GET',
        dataResponse: 'json'
      }).then(response => {
        // response = promise object
        console.log(response)
        returnedRecipe.push(response.data.meals[0].strMealThumb);
      })
      // const id = this.props.match.params.idMeal;
      // console.log('id:',id)
    this.setState(
      {
        recipeId: this.props.match.params.idMeal
      }
    ,
      () => getRecipeById(this.state.recipeId) 
    )
  }

  

  // getRecipeById = () => 
    
  // I think that because the axios call runs asynchronously it is running before the first console log prints
  // getRecipeObject = () => {
  //   console.log(this.props.match.params.idMeal)
    // this.setState({
    //   recipeId: this.props.match.params.idMeal
    // })
    // ,
    // axios({
    //   url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.state.recipeId}}`,
    //   method: 'GET',
    //   dataResponse: 'json'
    // }).then(response => {
    //   // response = promise object
    //   returnedRecipe.push(response.data.meals[0].strMealThumb);
    //   console.log(returnedRecipe)
    // });
  // }
  
  
  

  render(){

  console.log(returnedRecipe);
  console.log(this.props.match.params.idMeal)

    return (
      <div className="">
        <h2>This is the full recipe page</h2>
        <Link to="/">Home</Link>
        <Link to="/event/:">Event Page</Link>
        <Link to="/recipegrid/:">Recipes</Link>
        <img src={returnedRecipe[0]} alt=""/>
      </div>
    );
  };
}
export default FullRecipe;

// {props.match.params.idMeal}
