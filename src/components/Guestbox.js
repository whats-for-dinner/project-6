import React from 'react';
import Ingredients from './Ingredients'

class Guestbox extends React.Component{
    render(){
        //returns the guest's name as the Guestbox
        return (
            <div className="guestBoxContainer">
                <h3>{this.props.guest.name}</h3>
                <div>{this.props.ingredients.map((food) => {
                    return <Ingredients key={food.id} food={food}/>
                })}</div>
            </div>
        )
    }
}

export default Guestbox;