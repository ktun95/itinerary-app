import React from 'react'

export const ButtonRow = (props) => {
    console.log('button row component')
    console.log(props.children)
    return (
        <div className="flex-container-h">
            {props.children}
        </div>
    )
}
