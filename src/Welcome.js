import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserProfile from "./UserProfile";
import { quiz } from '../src/docs/quiz';
import { Typography, Button } from '@material-ui/core';

const styles = theme => ({

    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
    },
    welcome_text_css: {
        fontSize: "large",
        fontWeight: "500",
        fontVariant: "common-ligatures",
    },
    para_heading: {
        fontFamily: "auto",
        fontSize: "medium",
        fontStyle: "unset",
        fontVariant: "common-ligatures"
    },
    grid_css: {
        textAlign: "center",
    },
    welcome_css: {
        marginLeft: "3%",
        marginTop: "5%"
    }
});
class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            open_User_Profile: false
        }
    }

    async componentDidMount() {
        document.title = 'Welcome';
    }
    handleGetStarted = async () => {
        await this.setState({ ...this.state, open_User_Profile: true });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.welcome_css}>
                {!this.state.open_User_Profile &&
                    <div className={classes.root}>
                        <Typography variant="h6" gutterBottom className={classes.welcome_text_css}>
                            <br />
                            <b>
                                C-Space offers access to a Multiple services to patrons. This Questionnaire tests your ability and knowledge about C-Space service.
                            <br />
                                <br />
                            </b>
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ "background": "#3b3b3b" }}
                            onClick={() => this.handleGetStarted({ vertical: 'bottom', horizontal: 'center' })}>
                            Get Started
                </Button>
                    </div>}
                {
                    this.state.open_User_Profile &&
                    <UserProfile
                        quiz={quiz}
                        shuffle={true}
                        showInstantFeedback={false}
                        continueTillCorrect={false} />
                }
            </div >
        );
    }
}
export default withStyles(styles)(Welcome);