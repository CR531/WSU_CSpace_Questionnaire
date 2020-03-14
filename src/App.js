import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import wsu_logo from "./Images/wsu_logo.PNG";
import './index.css';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Dash from "./Dash";
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
  appbar_css: {
    // height: "11%",
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
          <Dash />
        </div>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(App);