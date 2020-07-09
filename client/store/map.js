const ADD_MAP = 'ADD_MAP'
const ADD_LAYER = 'ADD_LAYER'

export const addMap = (map) => {
    console.log('redux adding map')
    return {type: ADD_MAP, map}
}
export const addLayer = (layer) => ({type: ADD_LAYER, layer})

const initialState = {
    map: {},
    layers: {
        activities: {},
        businesses: {}
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MAP:
            return {...state, map: action.map}
        case ADD_LAYER:
            return {...state, layers: {activities: state.layers.activities, businesses: state.layers.businesses, ...action.layer } }
        default: 
            return state
    }
}

export default reducer
