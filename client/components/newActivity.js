import React, { useState, useEffect } from 'react'

export const NewActivity = () => {
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState({lat: null, lon: null})
    const [description, setDescription] = useState('')

    useEffect(() => {
        console.log('newActivity Box Thing Activate')
    })

    const changeTitle = (e) => {
        setTitle(e.target.value)
    }

    const changeDescription = (e) => {
        setDescription(e.target.value)
    }

    return (
        <div className="dropdown">
            <input placeholder="Activity Name" value={title} onChange={(e) => changeTitle(e)} />
            <input placeholder="Enter lat-long coordinate pair, ex: 71.2, 43.7" />
            <textarea rows="5" cols="50" placeholder="Write a description" value={description} onChange={(e) => changeDescription(e)} />
        </div>
    )
}
