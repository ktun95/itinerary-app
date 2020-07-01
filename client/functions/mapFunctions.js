import axios from 'axios';

export const getYelpBusinesses = async (queryObj) => {
    
    const businesses = await axios({
        method: 'post',
        url: '/yelp/search',
        data: queryObj
    })      

    return businesses.data;
}