import React, { useState } from 'react'

export const AddActivity = (props) => {
    // const [isHidden, setIsHidden] = useState(true)
    
    return (
        <div className={props.isHidden ? "overlay-hidden" : "overlay"}>
            <div className={props.isHidden ? "popup-menu-hidden" : "popup-menu"}>
                <h1> Add Activity </h1>
            </div>
        </div>
    )
}


