import React, { Component } from 'react';
import ingData from './ingData';
import Guestbox from './Guestbox'
import { link } from 'fs';

class IngApp extends Component {
  constructor() {
    super();
    this.state = ingData
  }

  render() {
    return (
        //map over guestOrder (which contains all guests, each written as a string that is also their 'id' key value) and 
        // create a variable currentGuest which represents the guest currently being mapped over and a variable currentIngredients which is currentGuests ingredients
        this.state.guestOrder.map((guestId) => {
            const currentGuest = this.state.guests[guestId];
            const currentIngredients= currentGuest.ingredients

            return <Guestbox key={currentGuest.id} guest={currentGuest} ingredients={currentIngredients}/>
        })
    )
      
    
  }
}
export default IngApp;
