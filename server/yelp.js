const express = require('express');
const router = express.Router();
const axios = require('axios');
const queryString = require('query-string')
const API_KEY = process.env.NODE_ENV === 'development' ? require('../secrets') : process.env.YELP_API_KEY;
// console.log(process.env.NODE_ENV)
// console.log(API_KEY)
// console.log('HELLO')
console.log(API_KEY)

router.use((req, res, next) => {
    req.API_KEY = API_KEY
    console.log(req.API_KEY)
    next()
});

router.post('/search',  async (req, res, next) => {
    const qString = queryString.stringify(req.body)
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.yelp.com/v3/businesses/search?${qString}`,
            headers: {'Authorization': `Bearer ${API_KEY}`}
        })
        res.json(response.data)
    } catch (err) {
        next(err)
    }
})

module.exports = router;

