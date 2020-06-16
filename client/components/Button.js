import React from 'react'

export const Button = ({text, handler}) => {
    
    return (
        <div onClick={handler}>
            {text}
        </div>
    )
}
