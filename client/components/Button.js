import React from 'react'

const Button = ({text, handler}) => {
    
    return (
        <div onClick={handler}>
            {text}
        </div>
    )
}

export default Button
