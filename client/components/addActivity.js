import React, { useState } from 'react'
import { connect } from 'react-redux'
import { postActivity } from '../store';

export const AddActivity = (props) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [location, setLocation] = useState('')
    
    const handleChange = (e, setState) => {
        setState(e.target.value)
    }

    const handleClick = (name, description, location) => {
        if (name.length === 0) {
            document.getElementById('name').className = 'warning'
        }
        
        if (description.length === 0) {
            document.getElementById('description').className = 'warning'
        }

        setTimeout(() => {
            const forms = Array.from(document.getElementsByClassName('warning'))
            forms.forEach(element => {element.className = ''})
        }, 300)
    }

    return (
        <div className={props.isHidden ? 'overlay-hidden' : 'overlay'}>
            <div className={props.isHidden ? 'popup-menu-hidden' : 'popup-menu'}>
                <h1> Add Activity </h1>
                <form className="activity-form">
                    <p> Name </p>
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => handleChange(e, setName)}
                    />
                    <p> Description </p>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => handleChange(e, setDescription)}
                    />
                    <button
                        type="button"
                        onClick={() => handleClick(name, description)}>
                            I don't work yet 
                    </button>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    AddActivity: (activity) => dispatch(postActivity(activity))
})

