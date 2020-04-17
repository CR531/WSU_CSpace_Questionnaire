import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import UserProfile from "./UserProfile";
import { quiz } from '../src/docs/quiz';
import { Typography, Button, Card, CardContent } from '@material-ui/core';
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
    },
    main_card: {
        width: "90%",
        marginTop: "5%",
        marginLeft: "4%",
        marginRight: "4%",
    },
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
                        <Card className={classes.main_card}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom className={classes.welcome_text_css}>
                                    <br />
                                    <b>
                                        Welcome to C-Space Questionnaire
                                <br />
                                        <br />
                                 Creation Space (C-Space) is an area for collaboration and experimentation where WSU students, faculty, and staff can come together to learn new things and work with advanced media technologies on a variety of projects. C-Space promotes a superior user experience through innovative services that support the educational, cultural, and research needs of the University and its community partners.
                                <br />
                                        <br />
                                C-Space offers access to a Multiple services to patrons like.
                                <br />
                                 1) Media Design Zone
                                 <br />
                                 2) Sound Booth
                                 <br />
                                 3) Virtual Reality Zone
                                  <br />
                                 4) Advanced Development Zone
                                  <br />
                                 5) One Button Studio
                                  <br />
                                 6) Scanning Zone
                                  <br />
                                 7) Product Photo Studio
                                 <br />
                                        <br />
                                 This Questionnaire tests your ability and knowledge about C-Space services.
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
                            </CardContent>
                        </Card>
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