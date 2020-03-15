import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import MainLanding from "./MainLanding";
import DateFnsUtils from '@date-io/date-fns';
import Checkbox from '@material-ui/core/Checkbox';


import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
const styles = theme => ({
    root: {
        width: '90%',
    },
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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    grid_margin: {
        marginBottom: "-2%",
        textAlign: "center"
    },
    date_instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
});
class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open_Questionnaire: false,
            name: "",
            email: "",
            wsuid: "",
            phone: "",
            major: "",
            cummulative_Gpa: "",
            exp_grad_year: "",
            test_date: null,
            ssn_check: false
        }
    }
    async componentDidMount() {
        document.title = 'User Profile';
    }
    takeTest = async () => {
        await this.setState({ ...this.state, open_Questionnaire: true })
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                {!this.state.open_Questionnaire &&
                    <div>
                        <div className={classes.root} style={{ "marginBottom": "2%" }}>
                            <Typography variant="h6" gutterBottom className={classes.main_heading} style={{ "marginLeft": "20%" }} >
                                <b> Please enter your profile details</b>
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={12} className={classes.grid_margin} >
                                    <TextField
                                        id="name"
                                        label="Name"
                                        placeholder="Name"
                                        style={{ "width": "60%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        required={this.state.name_flag}
                                        value={this.state.name}
                                        onChange={(value) => this.onGenericChange(value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} className={classes.grid_margin}>
                                    <TextField
                                        id="email"
                                        label="Email"
                                        placeholder="Email"
                                        style={{ "width": "60%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        required={this.state.email_flag}
                                        value={this.state.email}
                                        onChange={(value) => this.onGenericChange(value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.grid_margin} style={{ "marginRight": "-20%", "marginLeft": "10%" }}>
                                    <TextField
                                        id="wsuid"
                                        label="WSU ID"
                                        placeholder="WSU ID"
                                        style={{ "width": "60%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        required={this.state.wsuid_flag}
                                        value={this.state.wsuid}
                                        onChange={(value) => this.onGenericChange(value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.grid_margin}>
                                    <TextField
                                        id="phone"
                                        label="Phone"
                                        placeholder="Phone"
                                        style={{ "width": "60%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.phone}
                                        onChange={(event) => {
                                            if (event.target.value.length <= 10) {
                                                if (isNaN(Number(event.target.value))) {
                                                    return;
                                                } else {
                                                    this.setState({ ...this.state, phone: event.target.value });
                                                }
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} className={classes.grid_margin} >
                                    <TextField
                                        id="major"
                                        label="Major"
                                        placeholder="Major"
                                        style={{ "width": "60%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        required={this.state.major_flag}
                                        value={this.state.major}
                                        onChange={(value) => this.onGenericChange(value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.grid_margin} style={{ "marginRight": "-20%", "marginLeft": "10%" }}>
                                    <TextField
                                        id="cummulative_Gpa"
                                        label="Cummulative GPA"
                                        placeholder="Cummulative GPA"
                                        style={{ "width": "60%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        required={this.state.gpa_flag}
                                        value={this.state.cummulative_Gpa}
                                        onChange={(event) => {
                                            if (isNaN(Number(event.target.value))) {
                                                return;
                                            } else {
                                                this.setState({ ...this.state, cummulative_Gpa: event.target.value });
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.grid_margin}>
                                    <TextField
                                        id="exp_grad_year"
                                        label="Expected Graduation (Month and Year)"
                                        placeholder="Expected Graduation (Month and Year)"
                                        style={{ "width": "60%" }}
                                        className={classes.textField}
                                        margin="normal"
                                        variant="outlined"
                                        value={this.state.exp_grad_year}
                                        onChange={(value) => this.onGenericChange(value)}
                                    />
                                </Grid>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid item xs={12} sm={3} className={classes.grid_margin} container justify="space-around" style={{ "marginLeft": "17%", "marginTop": "1%" }}>
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="MM/dd/yyyy"
                                            margin="normal"
                                            id="test_date"
                                            label="Test Date *"
                                            placeholder='mm/dd/yyyy'
                                            value={this.state.test_date}
                                            onChange={this.handleTestDateChange}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <Grid item xs={12} sm={3} className={classes.grid_margin} style={{ "marginLeft": "8%", "marginTop": "3%" }}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    id="ssn_check"
                                                    checked={this.state.ssn_check}
                                                    onChange={() => this.handleSSNChange()}
                                                    color="primary"
                                                    value={this.state.ssn_check}
                                                />
                                            }
                                            label="SSN(Social Security Number)"
                                        />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </div >
                        <br />
                        <div
                            className={classes.root}
                            style={{ "textAlign": "right" }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ "background": "#3b3b3b", "marginRight": "20%", "width": "12%" }}
                                onClick={() => this.takeTest({ vertical: 'bottom', horizontal: 'center' })}>
                                Take Test
                        </Button>
                        </div>
                    </div>}
                {this.state.open_Questionnaire &&
                    <MainLanding />
                }
            </div>
        );
    }
}
export default withStyles(styles)(UserProfile);