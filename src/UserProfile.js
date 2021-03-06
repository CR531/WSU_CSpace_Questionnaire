import React, { Component } from 'react';
import { withStyles, } from '@material-ui/core/styles';
import {
    Button,
    Typography,
    Grid,
    FormGroup,
    FormControlLabel,
    TextField,
    Checkbox,
    IconButton,
    Snackbar,
    SnackbarContent,
    Card,
    CardContent
} from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";
import DateFnsUtils from '@date-io/date-fns';
import "./styles.css";
import { defaultLocale } from '../src/lib/Locale';
import Core from "../src/lib/Core";
import PropTypes from 'prop-types';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

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
    message: {
        display: 'flex',
        alignItems: 'center',
        fontWeight: "500",
        fontSize: "large",
        fontVariant: "all-petite-caps",
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    close: {
        padding: theme.spacing(0.5),
    },
    main_card: {
        width: "90%",
        marginTop: "5%",
        marginLeft: "4%",
        marginRight: "4%",
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
            ssn_check: false,
            name_flag: false,
            email_flag: false,
            wsuid_flag: false,
            major_flag: false,
            exp_grad_year_flag: false,
            required_snackbar: false
        }
    }
    async componentDidMount() {
        document.title = 'User Profile';
        this.setState({
            ...this.state,
            open_Questionnaire: false,
            name: "",
            email: "",
            wsuid: "",
            phone: "",
            major: "",
            cummulative_Gpa: "",
            exp_grad_year: "",
            test_date: null,
            ssn_check: false,
            name_flag: false,
            email_flag: false,
            wsuid_flag: false,
            major_flag: false,
            exp_grad_year_flag: false,
            required_snackbar: false
        })
        if (this.state.name === "") {
            await this.setState({ ...this.state, name_flag: true })
        }
        if (this.state.email === "") {
            await this.setState({ ...this.state, email_flag: true })
        }
        if (this.state.wsuid === "") {
            await this.setState({ ...this.state, wsuid_flag: true })
        }
        if (this.state.major === "") {
            await this.setState({ ...this.state, major_flag: true })
        }
        if (this.state.exp_grad_year === "") {
            await this.setState({ ...this.state, exp_grad_year_flag: true })
        }
    }
    onGenericChange = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value });
    }
    handleTestDateChange = date => {
        this.setState({ ...this.state, test_date: date });
    }
    handleSSNChange = () => {
        this.setState({
            ...this.state,
            ssn_check: !(this.state.ssn_check)
        });
    }

    takeTest = async () => {
        if (this.state.name === "" || this.state.wsuid === "" || this.state.email === "" || this.state.major === "" || this.state.exp_grad_year === "" || this.state.test_date === null) {
            await this.setState({ ...this.state, required_snackbar: true });
        }
        if (this.state.name !== "" && this.state.wsuid !== "" && this.state.email !== "" && this.state.major !== "" && this.state.exp_grad_year !== "" && this.state.test_date !== null) {
            await this.setState({ ...this.state, required_snackbar: false });
            await this.setState({ ...this.state, open_Questionnaire: true })
        }
    }
    handleRequiredSnackbarClose = async () => {
        await this.setState({ ...this.state, required_snackbar: false })
    }
    shuffleQuestions = (questions) => {
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        if (questions) {
            if (questions.length > 0) {
                var arr = [];
                var questions_Array = [];
                while (arr.length < 10) {
                    var r = Math.floor(Math.random() * 45) + 1;
                    if (arr.indexOf(r) === -1) arr.push(r);
                }
                for (let x = 0; x < arr.length; x++) {
                    questions_Array.push(questions[x]);
                }
            }
        }
        return questions_Array;
    }

    validateQuiz = async (quiz) => {
        if (!quiz) {
            console.error("Quiz object is required.");
            return false;
        }

        const { questions } = quiz;

        if (!questions) {
            console.error("Field 'questions' is required.");
            return false;
        }

        for (var i = 0; i < questions.length; i++) {
            const { question, questionType, answers, correctAnswer } = questions[i];
            const answerSelectionType = "single";
            if (!question) {
                console.error("Field 'question' is required.");
                return false;
            }

            if (!questionType) {
                console.error("Field 'questionType' is required.");
                return false;
            } else {
                if (questionType !== 'text' && questionType !== 'photo') {
                    console.error("The value of 'questionType' is either 'text' or 'photo'.");
                    return false;
                }
            }

            if (!answers) {
                console.error("Field 'answers' is required.");
                return false;
            } else {
                if (!Array.isArray(answers)) {
                    console.error("Field 'answers' has to be an Array");
                    return false;
                }
            }

            if (!correctAnswer) {
                console.error("Field 'correctAnswer' is required.");
                return false;
            }

            if (!answerSelectionType) {
                // Default single to avoid code breaking due to automatic version upgrade
                console.warn("Field answerSelectionType should be defined since v0.3.0. Use single by default.")
                answerSelectionType = answerSelectionType || 'single';
            }

            if (answerSelectionType === 'single' && !(typeof answerSelectionType === 'string' || answerSelectionType instanceof String)) {
                console.error("answerSelectionType is single but expecting String in the field correctAnswer");
                return false;
            }

            if (answerSelectionType === 'multiple' && !Array.isArray(correctAnswer)) {
                console.error("answerSelectionType is multiple but expecting Array in the field correctAnswer");
                return false;
            }
        }

        return true;
    }
    render() {
        const { classes, quiz, shuffle, showDefaultResult, onComplete, customResultPage, continueTillCorrect } = this.props;


        if (!this.validateQuiz(quiz)) {
            return (null)
        }

        const appLocale = {
            ...defaultLocale,
            ...quiz.appLocale
        };
        let questions = quiz.questions;
        if (shuffle) {
            questions = this.shuffleQuestions(questions);
        }

        questions = questions.map((question, index) => ({
            ...question,
            questionIndex: index + 1
        }));
        return (
            <div>
                {!this.state.open_Questionnaire &&
                    <Card className={classes.main_card}>
                        <CardContent>
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
                                                required={this.state.exp_grad_year_flag}
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
                                        onClick={() => this.takeTest()}>
                                        Take Test
                        </Button>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                }
                {this.state.open_Questionnaire
                    &&
                    <Core
                        userDetails={this.state}
                        questions={questions}
                        showDefaultResult={showDefaultResult}
                        onComplete={onComplete}
                        customResultPage={customResultPage}
                        continueTillCorrect={continueTillCorrect}
                        appLocale={appLocale} />
                }

                <Snackbar
                    open={this.state.required_snackbar}
                    onClose={() => this.handleRequiredSnackbarClose()}
                    autoHideDuration={3000}
                >
                    <SnackbarContent
                        style={{ "background": "black" }}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
                                Please Enter Required Fields
                            </span>
                        }
                        action={[
                            <IconButton
                                key="close"
                                aria-label="close"
                                color="inherit"
                                className={classes.close}
                                onClick={() => this.handleRequiredSnackbarClose()}
                            >
                                <CloseIcon />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            </div>
        );
    }
}
UserProfile.propTypes = {
    quiz: PropTypes.object,
    shuffle: PropTypes.bool,
    showDefaultResult: PropTypes.bool,
    onComplete: PropTypes.func,
    customResultPage: PropTypes.func,
    continueTillCorrect: PropTypes.bool
};
export default withStyles(styles)(UserProfile);