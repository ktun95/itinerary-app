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
    const { display } = props;
    const [isAddingNewActivity, setAddingNewActivity] = useState(false);
    const handleClickSelect = props.handleClickSelect;
    // const [handleClick, ...props] = props
    console.log(props.activities)
    return (
        <Drawer variant="permanent" open={false}>
            <ButtonRow>
                <div className="click-wrapper" value="activities" onClick={() => props.handleButtonClick('activities')}>
                    <MuiButton variant="extended"> My Activities </MuiButton>
                </div>
                <div className="click-wrapper" value="businesses" onClick={() => props.handleButtonClick('businesses')}>
                    <MuiButton variant="extended"> Businesses</MuiButton>
                </div>
                <div className="click-wrapper" value="businesses" onClick={() => props.handleButtonClick('all')}>
                    <MuiButton variant="extended"> All </MuiButton>
                </div>
                <MuiButton color="primary"> + </MuiButton>
            </ButtonRow>
            {/* <Button text="Add Activity" handler={() => setAddingNewActivity(!isAddingNewActivity)}/>
            {isAddingNewActivity ?
                <NewActivity />
                : null
            } */}
            {display ? display.map((activity) => {
                return <Box title={activity.title || activity.name} description={activity.description} key={activity.id} id={activity.id} isSelected={activity.id === props.selected} handleClickSelect={handleClickSelect} />
            })
            : null}
        </Drawer>
    )
}

const mapDispatchToProps = dispatch => ({
    addActivity: (activity) => dispatch(addActivity(activity))
})

export default connect(null, mapDispatchToProps)(Sidebar)