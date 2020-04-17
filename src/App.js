import React, { Component } from 'react';
import {
  Typography,
  Grid,
  Divider,
  AppBar
} from '@material-ui/core';
import wsu_logo from "./Images/wsu_logo.PNG";
import './index.css';
import { withStyles } from '@material-ui/core/styles';
import Welcome from "./Welcome";
const styles = theme => ({
  title1: {
    flexGrow: 1,
    color: "white",
    marginLeft: "22%",
    fontSize: "200%",
    fontWeight: "500",
    fontVariant: "all-petite-caps",
  },
  root: {
    flexGrow: 1,
  },
  grid_css: {
    marginTop: "1%",
  },
});

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <AppBar position="fixed" className={classes.appbar_css} style={{ "background": "#3b3b3b" }}>
          <Grid container className={classes.grid_css} style={{ "background": "#3b3b3b" }}>
            <Grid item xs><img
              className="wsu_logo_css"
              src={wsu_logo}
              alt="WSU Logo"
            >
            </img>
            </Grid>
            <Grid item xs><Typography variant="h6" className={classes.title1}>
              C-Space Questionnaire
                      </Typography></Grid>
            <Grid item xs></Grid>
          </Grid>
        </AppBar>
        <Divider />
        <div>
          <Welcome />
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(App);