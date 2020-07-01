import axios from 'axios'
import { getYelpBusinesses } from '../functions/mapFunctions'

//ACTION TYPES
const ADD_ACTIVITY = 'ADD_ACTIVITY';
const ADD_BUSINESS = 'ADD_BUSINESS';

//ACTION CREATORS 
export const addActivity = (activity) => ({type: ADD_ACTIVITY, activity});
export const addBusiness = (business) => ({type: ADD_BUSINESS, business});

//THUNK CREATORS

export const postActivity = activity =>  async dispatch => {
    dispatch(addActivity(activity))
}
export const postBusiness = (location, term) =>  async dispatch => {
    try {
        const data = await getYelpBusinesses({location, term})
        dispatch(addBusiness(data.businesses))
    } catch (err) {
        console.error(err)
    }
}

//INITIAL STATE

const initialState = {
    businesses: [],
    activities: [
        {
            id: 1,
            title: 'Tacos el Gordo',
            description: 'The Tacos here are really good, eat this yum yum yum yum',
            coordinates: {
                latitude: 32.6290706,
                longitude: -117.0912042
            }
        },
        {
            id: 2,
            title: 'Timken Museum of Art',
            description: 'Watch the best anime from the 90s',
            coordinates: {
                latitude: 32.73188602289799,
                longitude: -117.14963050421301
            }
        },
        {
            id: 3,
            title: 'Crack House',
            description: 'Really good hot chicken sandwiches here!',
            coordinates: {
                latitude: 32.727,
                longitude: -117.173
            }
        },
        {
            id: 4,
            title: 'Sunset Cliffs',
            description: 'Beautiful views. Good seagulls',
            coordinates: {
                latitude: 32.7273047,
                longitude: -117.2597412
            }
        },
        {
            id: 5,
            title: 'Phils BBQ',
            description: 'bEST barbecue in the entire San Diego International Airport!! ',
            coordinates: {
                latitude: 32.7339637,
                longitude: -117.2062292
            }
        },
        {
            id: 6,
            title: 'SeaWorld San Diego',
            description: 'Liberate the orcas',
            coordinates: {
                latitude: 32.7647948,
                longitude: -117.228797
            }
        },
    ]
}

//REDUCER
const reducer = (state = initialState, action) => {
switch (action.type) {
        case ADD_ACTIVITY:
            return {...state, activities: action.activity }
        case ADD_BUSINESS:
            return {...state, businesses: action.business }
        default:
            return state
    }
}

export default reducer;
