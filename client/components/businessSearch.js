import React, { useState } from 'react'
import axios from 'axios'

const businessSearch = () => { //change name to activitySearch?
    const [suggestions, setSuggestions] = useState(null)
    
    const lookUp = (queryString) => {
        
    }

    return (
        <div>
            <input id="business-search"></input>
        </div>
    )
}

export default businessSearch
