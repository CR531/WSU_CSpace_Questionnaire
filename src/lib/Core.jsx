import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Button,
  ListItem,
  List,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Card,
  CardContent
} from '@material-ui/core';
import axios from 'axios';

const styles = theme => ({
  main_heading: {
    fontSize: "x-large",
    fontWeight: "bolder",
    fontVariant: "all-petite-caps",
  },
  quiz_End_css: {
    fontSize: "large",
    fontWeight: "500",
    fontVariant: "common-ligatures",
  },
  grid_margin: {
    marginBottom: "-2%",
    textAlign: "center"
  },
  question_css: {
    marginLeft: "27%",
    marginBottom: "-2%",
    float: "left"
  },
  list: {
    marginLeft: "4%",
    marginRight: "4%",
  },
  listItem: {
    marginBottom: "-1%"
  },
  answer_button_css: {
    marginLeft: "25%",
    width: "50%"
  },
  response_dialog_header_css: {
    background: "rgba(255, 194, 23, 0.95)",
  },
  main_card: {
    width: "90%",
    marginTop: "7%",
    marginLeft: "4%",
    marginRight: "4%",
  },
});
class Core extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      openEndQuizTab: false,
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      endQuiz: false,
      currentQuestionIndex: 0,
      buttons: {},
      buttonClasses: {},
      correct: [],
      incorrect: [],
      userInput: [],
      filteredValue: 'all',
      userAttempt: 1,
      showDefaultResult: this.props.showDefaultResult !== undefined ? this.props.showDefaultResult : true,
      onComplete: this.props.onComplete !== undefined ? this.props.onComplete : null,
      customResultPage: this.props.customResultPage !== undefined ? this.props.customResultPage : null,
      showInstantFeedback: this.props.showInstantFeedback !== undefined ? this.props.showInstantFeedback : false,
      continueTillCorrect: this.props.continueTillCorrect !== undefined ? this.props.continueTillCorrect : false,
      score: null,
      openFailureDialog: false,
      minutes: 10,
      seconds: 0,
      time_up: true
    };
  }

  checkAnswer = (index, correctAnswer, answerSelectionType) => {
    const { correct, incorrect, currentQuestionIndex, continueTillCorrect, userInput } = this.state;
    let { userAttempt, showNextQuestionButton } = this.state;

    if (answerSelectionType === 'single') {
      if (userInput[currentQuestionIndex] === undefined) {
        userInput.push(index)
      }

      if (index === correctAnswer) {
        if (incorrect.indexOf(currentQuestionIndex) < 0 && correct.indexOf(currentQuestionIndex) < 0) {
          correct.push(currentQuestionIndex);
        }

        let disabledAll = {
          0: { disabled: true },
          1: { disabled: true },
          2: { disabled: true },
          3: { disabled: true }
        }

        this.setState((prevState) => {
          const buttons = Object.assign(
            {},
            prevState.buttons,
            {
              ...disabledAll,
              [index - 1]: {
                className: (index === correctAnswer) ? "correct" : "incorrect"
              },
            }
          );
          return { buttons };
        })

        this.setState({
          correctAnswer: true,
          incorrectAnswer: false,
          correct: correct,
          showNextQuestionButton: true,
        })
      } else {
        if (correct.indexOf(currentQuestionIndex) < 0 && incorrect.indexOf(currentQuestionIndex) < 0) {
          incorrect.push(currentQuestionIndex)
        }

        if (continueTillCorrect) {
          this.setState((prevState) => {
            const buttons = Object.assign(
              {},
              prevState.buttons,
              {
                [index - 1]: {
                  disabled: !prevState.buttons[index - 1]
                }
              }
            );
            return { buttons };
          });
        } else {
          let disabledAll = {
            0: { disabled: true },
            1: { disabled: true },
            2: { disabled: true },
            3: { disabled: true }
          }

          this.setState((prevState) => {
            const buttons = Object.assign(
              {},
              prevState.buttons,
              {
                ...disabledAll,
                [index - 1]: {
                  className: (index === correctAnswer) ? "correct" : "incorrect"
                },
              }
            );
            return { buttons };
          })

          this.setState({
            showNextQuestionButton: true,
          })
        }

        this.setState({
          incorrectAnswer: true,
          correctAnswer: false,
          incorrect: incorrect,
        })
      }
    } else {

      let maxNumberOfMultipleSelection = correctAnswer.length;

      if (userInput[currentQuestionIndex] === undefined) {
        userInput[currentQuestionIndex] = []
      }

      if (userInput[currentQuestionIndex].length < maxNumberOfMultipleSelection) {
        userInput[currentQuestionIndex].push(index)

        if (correctAnswer.includes(index)) {
          if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {

            this.setState((prevState) => {
              const buttons = Object.assign(
                {},
                prevState.buttons,
                {
                  [index - 1]: {
                    disabled: !prevState.buttons[index - 1],
                    className: (correctAnswer.includes(index)) ? "correct" : "incorrect"
                  },
                }
              );
              return { buttons };
            })


          }
        } else {
          if (userInput[currentQuestionIndex].length <= maxNumberOfMultipleSelection) {
            this.setState((prevState) => {
              const buttons = Object.assign(
                {},
                prevState.buttons,
                {
                  [index - 1]: {
                    className: (correctAnswer.includes(index)) ? "correct" : "incorrect"
                  },
                }
              );
              return { buttons };
            })
          }
        }
      }

      if (maxNumberOfMultipleSelection === userAttempt) {
        let cnt = 0;
        for (var i = 0; i < correctAnswer.length; i++) {
          if (userInput[currentQuestionIndex].includes(correctAnswer[i])) {
            cnt++;
          }
        }

        if (cnt === maxNumberOfMultipleSelection) {
          correct.push(currentQuestionIndex);
          this.setState({
            correctAnswer: true,
            incorrectAnswer: false,
            correct: correct,
            showNextQuestionButton: true,
            userAttempt: 1
          })
        } else {
          incorrect.push(currentQuestionIndex)
          this.setState({
            incorrectAnswer: true,
            correctAnswer: false,
            incorrect: incorrect,
            showNextQuestionButton: true,
            userAttempt: 1
          })
        }
      } else {
        if (!showNextQuestionButton) {
          this.setState({
            userInput,
            userAttempt: userAttempt + 1
          })
        }
      }
    }
  }

  nextQuestion = (currentQuestionIndex) => {
    const { questions } = this.props;
    var initState = {
      incorrectAnswer: false,
      correctAnswer: false,
      showNextQuestionButton: false,
      buttons: {},
    }

    if (currentQuestionIndex + 1 === questions.length) {
      this.setState({
        ...initState,
        endQuiz: true
      })
    } else {
      this.setState({
        ...initState,
        currentQuestionIndex: currentQuestionIndex + 1,
      })
    }
  }


  rawMarkup = (data) => {
    let rawMarkup = marked(data, { sanitize: true });
    return { __html: rawMarkup };
  }
  handleResponseClose = () => {
    this.setState({ ...this.state, openFailureDialog: false })
  }
  renderAnswers = (question, buttons) => {
    const { classes } = this.props
    const { answers, correctAnswer } = question;
    let { answerSelectionType } = question;
    answerSelectionType = answerSelectionType || 'single';
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" >
              {answers.map((answer, index) => {
                return (
                  < FormControlLabel
                    value={answer}
                    control={<Radio />}
                    label={answer}
                    onClick={() => this.checkAnswer(index + 1, correctAnswer, answerSelectionType)} />
                )
              })}
            </RadioGroup>
          </FormControl>
        </ListItem>
      </List>
    )
  }
  submitTest = async (val) => {
    await this.setState({ ...this.state, time_up: false })
    const obj = {
      name: this.state.userDetails.name,
      email: this.state.userDetails.email,
      wsuid: this.state.userDetails.wsuid,
      phone: this.state.userDetails.phone,
      major: this.state.userDetails.major,
      cummulative_Gpa: this.state.userDetails.cummulative_Gpa,
      exp_grad_year: this.state.userDetails.exp_grad_year,
      test_date: this.state.userDetails.test_date,
      ssn_check: this.state.userDetails.ssn_check,
      status: "Done",
      score: (val ? val : 0)
    }
    await axios.post('http://localhost:4000/wsu_quesionnaire/add', obj)
      .then((res) => {
        this.setState({ response: res.data });
        console.log("response is :" + this.state.response.wsu_questionnaire);
      });
    if (this.state.response.wsu_questionnaire === "success") {
      await this.setState({ ...this.state, openEndQuizTab: true })
      await this.wait(1000);
    }
    if (this.state.response.wsu_questionnaire !== "success") {
      await this.setState({ ...this.state, openFailureDialog: true })
    }
    this.setState({
      ...this.state,
      userDetails: {}
    })

  }
  wait = (ms) => {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  }
  componentWillUnmount() {
    clearInterval(this.myInterval)
  }
  async componentDidMount() {
    const { userDetails } = this.props;
    await this.setState({ ...this.state, userDetails: userDetails });
    this.myInterval = setInterval(() => {

      if (this.state.seconds > 0) {
        this.setState(({ seconds }) => ({
          seconds: seconds - 1
        }))
      }
      if (this.state.seconds === 0) {
        if (this.state.minutes === 0) {
          clearInterval(this.myInterval)
        } else {
          this.setState(({ minutes }) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
  }
  Reload = () => {
    window.location.reload(false);
  }
  render() {
    const { classes, questions, appLocale } = this.props;
    const {
      correct,
      incorrect,
      userInput,
      currentQuestionIndex,
      endQuiz,
      buttons,
      onComplete,
      showNextQuestionButton,
      showDefaultResult,
      customResultPage
    } = this.state;

    let question = questions[currentQuestionIndex];
    let totalPoints = 0;
    let correctPoints = 0;
    if (questions) {
      if (questions.length > 0) {
        for (var i = 0; i < questions.length; i++) {
          let point = questions[i].point || 0;
          if (typeof point === 'string' || point instanceof String) {
            point = parseInt(point)
          }

          totalPoints = totalPoints + point;

          if (correct.includes(i)) {
            correctPoints = correctPoints + point;
          }
        }
      }
    }

    const questionSummary = {
      numberOfQuestions: questions.length,
      numberOfCorrectAnswers: correct.length,
      numberOfIncorrectAnswers: incorrect.length,
      questions: questions,
      userInput: userInput,
      totalPoints: totalPoints,
      correctPoints: correctPoints
    };

    let { answerSelectionType } = question;

    // Default single to avoid code breaking due to automatic version upgrade
    answerSelectionType = answerSelectionType || 'single';

    return (
      <div className="questionWrapper">
        {this.state.openFailureDialog &&
          <Dialog
            className={classes.main_heading}
            open={true}
            onClose={() => this.handleResponseClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle className={classes.response_dialog_header_css} id="alert-dialog-title">{"Submit Status"}</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText id="alert-dialog-description" style={{ "color": "black", "fontWeight": "bolder" }}>
                <br />
                {(this.state.response !== "success") &&
                  "Unable to save the test data. Please submit again or reach out to C-Space Representative."}
                <br />
              </DialogContentText>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={() => this.handleResponseClose()} color="primary" autoFocus>Ok</Button>
            </DialogActions>
          </Dialog>
        }
        {!endQuiz &&
          <div>
            {
              (this.state.minutes === 0 && this.state.seconds === 0)
                ?
                <Dialog
                  className={classes.main_heading}
                  open={this.state.time_up}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle className={classes.response_dialog_header_css} id="alert-dialog-title">{"Oops Time up!"}</DialogTitle>
                  <Divider />
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description" style={{ "color": "black", "fontWeight": "bolder" }}>
                      <br />
                      You ran out of time. Please click proceed to submit the answers done so far.
                      <br />
                    </DialogContentText>
                  </DialogContent>
                  <Divider />
                  <DialogActions>
                    <Button onClick={() => this.submitTest(correctPoints)} color="primary" autoFocus>Proceed</Button>
                  </DialogActions>
                </Dialog>
                :
                <div className="questionWrapperBody">
                  <h2>Time Remaining: {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>
                  <br />
                  <br />
                  <div>
                    <Typography variant="h6" gutterBottom className={classes.main_heading} style={{ "marginLeft": "20%" }} >
                      <b> Question {currentQuestionIndex + 1}:</b>
                    </Typography>
                  </div>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} className={classes.question_css} >
                      <h3 dangerouslySetInnerHTML={this.rawMarkup(question.question)} />
                    </Grid>
                    <Grid item xs={12} sm={12} className={classes.grid_margin} style={{ "marginLeft": "23%" }} >
                      {
                        this.renderAnswers(question, buttons)
                      }
                    </Grid>
                    <Grid item xs={12} sm={8} className={classes.grid_margin} >
                      {showNextQuestionButton &&
                        <div>
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ "background": "#3b3b3b", "marginRight": "-30%", "width": "15%", "float": "right" }}
                            onClick={() => this.nextQuestion(currentQuestionIndex)}
                          >
                            {appLocale.nextQuestionBtn}
                          </Button>
                        </div>
                      }
                    </Grid>
                  </Grid>
                </div>
            }
          </div>
        }

        {endQuiz && showDefaultResult && customResultPage == null && (this.state.openEndQuizTab === false) &&
          <Card className={classes.main_card}>
            <CardContent>
              < div className="card-body" style={{ "textAlign": "left" }}>
                <br />
                <Typography variant="h6" gutterBottom className={classes.quiz_End_css}>
                  <b>
                    Hurray! You've answered all the questions.
                <br />
                    <br />
                 Please click below Submit button to Finish or submit the test.
              <br />
                    <br />
                  </b>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ "background": "#3b3b3b", "width": "12%", }}
                  onClick={() => this.submitTest(correctPoints)}
                >
                  Submit
            </Button>
              </div>
            </CardContent>
          </Card>
        }
        {showDefaultResult && customResultPage == null && (this.state.openEndQuizTab === true) &&
          <Card className={classes.main_card}>
            <CardContent>
              <div className="card-body" style={{ "textAlign": "left" }}>
                <Typography variant="h6" gutterBottom className={classes.quiz_End_css}>
                  <b>
                    Thank you for submitting the WSU C-Space Questionnaire Test.
              <br />
                    <br />
              We appreciate your interest in WSU C-Space and the time you’ve invested in applying for the Graduate Assistant role at Library Technologies.
              <br />
                    <br />
            Your scores are submitted and Your application will be reviewed and we will contact you with next steps.
             <br />
                    <br />
                    {appLocale.resultPageHeaderText.replace("<correctIndexLength>", correct.length).replace("<questionLength>", questions.length)}
                  </b>
                </Typography>
                <h2>
                </h2>
                <h2>
                  {appLocale.resultPagePoint.replace("<correctPoints>", correctPoints).replace("<totalPoints>", totalPoints)}
                </h2>
                <br />
              </div>
              <Button
                variant="contained"
                color="primary"
                style={{ "background": "#3b3b3b", "width": "12%", }}
                onClick={() => this.Reload()}
              >
                Close
            </Button>


            </CardContent>
          </Card>
        }
        {
          endQuiz && onComplete != undefined &&
          onComplete(questionSummary)
        }

        {
          endQuiz && !showDefaultResult && customResultPage != undefined &&
          customResultPage(questionSummary)
        }
      </div >
    );
  }
}

Core.propTypes = {
  userDetails: PropTypes.object,
  questions: PropTypes.array,
  showDefaultResult: PropTypes.bool,
  onComplete: PropTypes.func,
  customResultPage: PropTypes.func,
  showInstantFeedback: PropTypes.bool,
  continueTillCorrect: PropTypes.bool,
  appLocale: PropTypes.object
};

export default withStyles(styles)(Core);