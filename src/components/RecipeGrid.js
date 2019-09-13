import React,{Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import axios from 'axios';

// let recipeArray = ['test','anothertest']

class RecipeGrid extends Component {
    constructor(){
        super();
        this.state = {
            userCategory: '',
            userRecipes: []
        }
    }

    updateUserCategory = (e) => {

        this.setState({
            userCategory: e.target.value
        }, 
        () => {
            this.axiosCall(this.state.userCategory)
        })
    }



    axiosCall = (updatedCategory) => {
        
        axios({
            url:`https://www.themealdb.com/api/json/v1/1/filter.php?c=${updatedCategory}`,
            method: 'GET',
            dataResponse: 'json'
        }).then((response) => {
            // recipeArray.length = 0;
            return response
        })
        .then((response) => {
            const recipeArray = [];

            recipeArray.push(response.data.meals);


            this.setState({
                userRecipes: recipeArray[0]
            })

         
            console.log(this.state.userRecipes)
           console.log(recipeArray)
        })
            
        
    }

    // getRecipes = () => {
        

        
    // }

  
    render(){

        return (
        
            <div className="">
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

                {/* {console.log(this.state.userRecipes)} */}
                {/* {console.log('cat')} */}
 
                {this.state.userRecipes.map((recipe, i) => {
                    console.log(recipe) 
                   return <h1 key={recipe.idMeal}>{recipe.idMeal}</h1>
                })}


                <Link to="/">Home</Link>
                <Link to="/event/:">Event Page</Link>
                <Link to="/fullrecipe/:">Full Recipe</Link>
            </div>
        
        );
  }
}
export default RecipeGrid;