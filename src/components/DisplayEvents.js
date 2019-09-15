import React from 'react';

function DisplayEvents(props){
    // console.log(this.props.events[0].guests)
    return (
        <div>
 
            {
                props.events.map((userEvents, eventIndex) => {
                    return (
                        // console.log(userEvents.eventName)
                        <p key={eventIndex}>{userEvents.eventName}</p>
                    )
                }
                )


            }
        </div>
    )
}


export default DisplayEvents;