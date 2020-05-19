import React from 'react'
import { Box } from './box'

export const Sidebar = (props) => {

    const handleClickSelect = props.handleClickSelect
    // const [handleClick, ...props] = props

    return (
        <div className="side-bar">
            {props.activities.map((activity) => {
                return <Box title={activity.title} description={activity.description} key={activity.id} id={activity.id} isSelected={activity.id === props.selected} handleClickSelect={handleClickSelect} />
            })}
        </div>
    )
}