import React from 'react'
import Fab from '@material-ui/core/Fab'
import { withStyles } from '@material-ui/core/styles'

const styles = {
    root: {
        marginRight: '0.5rem'
    }
}

const MuiButton = (props) => {
    const { classes, variant, color } = props;
    return <Fab color={color} variant={variant} className={classes.root}> {props.children} </Fab>
}

export default withStyles(styles)(MuiButton)
