import React, { useState } from 'react'
import { Box } from './box'
import { Button } from './Button'
import { NewActivity } from './newActivity'

export const Sidebar = (props) => {
    const [isAddingNewActivity, setAddingNewActivity] = useState(false);
    const handleClickSelect = props.handleClickSelect;
    // const [handleClick, ...props] = props

    return (
        <div className="side-bar">
            <Button text="Add Activity" handler={() => setAddingNewActivity(!isAddingNewActivity)}/>
            {isAddingNewActivity ?
                <NewActivity />
                : null
            }
            {props.activities.map((activity) => {
                return <Box title={activity.title} description={activity.description} key={activity.id} id={activity.id} isSelected={activity.id === props.selected} handleClickSelect={handleClickSelect} />
            })}
        </div>
    )
}