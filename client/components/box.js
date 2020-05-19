import React from 'react'
import Editable from './Editable'

export const Box = ({
    title, description, location, isSelected, ...props
}) => { //should receive title, description, location,  type, and icon through props
    
    const handleClickSelect = props.handleClickSelect

    const selectStyle = {
        borderLeftColor: 'coral',
        borderLeftWidth: '.5rem',
        marginLeft: '-.5rem',
        width: '30rem'
    }

    return (
        <div className={'box'} id={isSelected ? 'selected' : null}  onClick={() => handleClickSelect(props.id)}>
            <Editable text={title} />
            <br />
            <Editable text={description} />
            {/* <p>{description}</p> */}
        </div>
    )
}