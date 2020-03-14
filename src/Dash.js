import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import Welcome from "./Welcome";
import "./index.css";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
});

class Dash extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        const { classes } = this.props;
        return (
            <Router>
                <div className={classes.root}>
                    <Welcome />
                </div >
            </Router>
        );
    }
}
export default withStyles(styles)(Dash)