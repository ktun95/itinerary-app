import React, { useState } from 'react'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import Fab from '@material-ui/core/Fab'
import MuiButton from './muiButton'
import { Box } from './box'
import { Button } from './Button'
import { ButtonRow } from './buttonRow'
import { NewActivity } from './newActivity'
import { addActivity } from '../store/activities'

export const Sidebar = (props) => {
    const [display, setDisplay] = useState(props.activities)
    const [isAddingNewActivity, setAddingNewActivity] = useState(false);
    const handleClickSelect = props.handleClickSelect;
    // const [handleClick, ...props] = props
    console.log(props.activities)
    return (
        <Drawer variant="permanent" open={false}>
            <ButtonRow>
                <MuiButton variant="extended"> My Activities </MuiButton>
                <MuiButton variant="extended"> Businesses</MuiButton>
                <MuiButton variant="extended"> All </MuiButton>
                <MuiButton color="primary"> + </MuiButton>
            </ButtonRow>
            {/* <Button text="Add Activity" handler={() => setAddingNewActivity(!isAddingNewActivity)}/>
            {isAddingNewActivity ?
                <NewActivity />
                : null
            } */}
            {display ? display.map((activity) => {
                return <Box title={activity.title} description={activity.description} key={activity.id} id={activity.id} isSelected={activity.id === props.selected} handleClickSelect={handleClickSelect} />
            })
            : null}
        </Drawer>
    )
}

const mapDispatchToProps = dispatch => ({
    addActivity: (activity) => dispatch(addActivity(activity))
})

export default connect(null, mapDispatchToProps)(Sidebar)