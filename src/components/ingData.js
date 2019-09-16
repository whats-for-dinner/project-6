const ingData = {
    ingredients:{
        ing1:{
            id: 'ing1',
            content: '3 carrots'
        },
        ing2:{
            id: 'ing2',
            content: '4 tbsp. flour'
        },
        ing3:{
            id: 'ing3',
            content: 'pinch salt'
        },
    },
    guests: {
        guest1:{
            id: 'guest1',
            name: 'Prashath',
            ingIds: ['ing1', 'ing2','ing3']
        }
    },
    guestOrder: ['guest1']
}

export default ingData;