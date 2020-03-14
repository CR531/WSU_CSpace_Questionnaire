import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MainLanding from './MainLanding';
import Button from '@material-ui/core/Button';

const styles = theme => ({

    main_heading: {
        fontSize: "x-large",
        fontWeight: "500",
        fontVariant: "all-petite-caps",
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
            open_Questionnaire: false
        }
    }

    async componentDidMount() {
        document.title = 'Welcome';
    }
    handleGetStarted = async () => {
        await this.setState({ ...this.state, open_Questionnaire: true });
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.welcome_css}>
                {!this.state.open_Questionnaire &&
                    <div className={classes.root}>
                        <p className={classes.para_heading}>
                            C-Space offers access to a Multiple services to patrons. This Questionnaire tests your ability and knowledge about C-Space service.</p>
                        <p className={classes.para_heading}><b>General Policies</b></p>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ "background": "#3b3b3b" }}
                            onClick={() => this.handleGetStarted({ vertical: 'bottom', horizontal: 'center' })}>
                            Get Started
                </Button>
                    </div>}
                {this.state.open_Questionnaire &&
                    <MainLanding />
                }
            </div>
        );
    }
}
export default withStyles(styles)(Welcome);