import {
    withStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import React, { Component } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import backEndApi from "../../services/api";
import Input from "@material-ui/core/Input";
import Button from '@mui/material/Button';
import LottieAnimation from "./lotiContact";
import lotiContact from "./contactus2.json";

const useStyles = (theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(0),
            width: "15ch",
        },
        "& .MuiFilledInput-root": {
            background: "#eee",
        },
    },

    emailBoxStyling: {
        width: "80%",
        margin: "1em 0",
        "& .MuiFilledInput-root": {
            /**to override the primary color of the material ui component */
            background: "#E7E7E7",
        },
    },
    commentFieldStyling: {
        width: "80%",
        height:'10px',
        margin: "1em 0",
        background: "#f8f6f6",
    },

    btn1: {
        width: "100%",
        marginLeft: '53%',
        margin: "1em 0",
        "& .MuiFilledInput-root": {
            /**to override the primary color of the material ui component */
            background: "#E7E7E7",

        },
    },

});

class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: '',
            email: '',
            errorMessage: '',
            successMessage: '',
        }

    }

    handleSubmit(e){
        e.preventDefault();
        this.validateInput();
    }

    // get the api
    feedbackApiRequest = async (feedback) => {
        const {data} = await backEndApi.post('/feedback', feedback);
        this.setState({
            errorMessage: '',
            successMessage: 'You have successfully  sent a Feedback information.'
        });
    };

    // validate correct input values

    validateInput = () => {
        const UserFeedback = {
            feedback: this.state.feedback,
            email: this.state.email,
        };

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        var nameFormat=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]/;


        if (this.state.feedback && this.state.email) {
            if (!nameFormat.test(this.state.feedback)) {
                this.setState({errorMessage: "The feedback that you have entered is incorrect."})
            } else if (!mailformat.test(this.state.email)) {

                this.setState({errorMessage: "The email that you have provided is invalid."})

            } else {
                if (this.state.errorMessage === '') {
                    this.feedbackApiRequest(UserFeedback)
                }
            }

        }

        else {
            this.setState({errorMessage: "Please fill all the inputs correctly."})
        }


    };

    // accept each input values
    onFeedbackChange(event) {
        this.setState({feedback: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

// shows error or success message
    errorcheck = () => {
        if (this.state.errorMessage) {
            return <Typography variant='h6'
                               style={{
                                   color: 'red',
                                   marginLeft: '5px',
                                   fontSize: '14px'
                               }}>{this.state.errorMessage}</Typography>
        } else {
            return <Typography variant='body2' style={{color: 'red', display: 'none'}}>''</Typography>
        }
    };
    successCheck = () => {
        if (this.state.successMessage) {
            return <Typography variant='h6'
                               style={{color: 'green', marginLeft: '5px'}}>{this.state.successMessage}</Typography>
        } else {
            return <Typography variant='body2' style={{color: 'red', display: 'none'}}>''</Typography>
        }

    };

    render() {
        const { classes } = this.props;
        return (
            <div style={parentDivStyling}>
                <div style={{ width: "100%", margin: "2em 0", textAlign: "center" }}>
                    <Typography variant="h4">FeedBack</Typography>
                    <LottieAnimation lotti={lotiContact} height={100} width={200}/>
                </div>
                <form
                    id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST"
                    className={classes.root}
                    noValidate
                    autoComplete="off"
                    style={stylingForm}>
                    <TextField
                        id="filled-basic"
                        label="email"
                        type={"email"}
                        variant="outlined"
                        name="email"
                        value={this.state.email} onChange={this.onEmailChange.bind(this)}
                        className={classes.emailBoxStyling}
                    />
                    {/* <DoneIcon color="primary" style={this.state.view.email} /> */}
                    <div>
                        <span style={{ color: "red" }}>{this.state.error}</span>
                    </div>
                    <TextareaAutosize
                        id="feedback"
                        minRows={7}
                        placeholder="write a comment"
                        name="feedback"
                        value={this.state.feedback} onChange={this.onFeedbackChange.bind(this)}
                        className={classes.commentFieldStyling}
                    />
                    <div style={{width:'110%'}}>
                        {this.state.errorMessage ? this.errorcheck() : this.successCheck()}
                    </div>
                    <div className={classes.btn1}>
                        <Button  variant="contained" color="primary"
                                id="submit"
                                type="submit"
                                value="Submit"
                                size="large"
                        >Submit</Button>
                    </div>


                </form>
            </div>
        );
    }
}

const stylingForm = {
    marginLeft: "10%",
};

const parentDivStyling = {
    width: "100%",
    display: "flex",
    margin: "auto",
    justifyContent: "center",
    flexDirection: "column",
};


export default withStyles(useStyles, { withTheme: true })(FeedBack);
