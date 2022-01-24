import React from 'react';
import {Container, Grid, withStyles} from "@material-ui/core";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import backEndApi from '../../../services/api'
const loginImage = process.env.PUBLIC_URL + '/img/99.png';
const useStyles = theme => ({
    root: {

        /* backgroundColor: '#333',*/
        marginTop: '60px',
        padding: '50px !important',
        background: '#eeeeee',
        borderRadius: '15px',
        "& a": {
            color: '#5066e4',
        },


    },
    paper: {
        marginTop: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        background: '#3F51B5',
        borderRadius: '5px',
        width: '406px',
        height: '50px',
        fontSize: '18px',
        margin: theme.spacing(3, 0, 2),
        "&:hover": {
            background: '#2c3980',
        }
    },
    textField: {
        marginBottom: '15px',
        background: "#F2EDD7",
        borderRadius: '5px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        width: '406px',
        border: '0px solid #FFF',
        borderLeftWidth: '7px',
        borderLeftColor: '#eeeeee',
        "& input": {
            background: '#eeeeee',
            border: '0px solid red',
            borderRadius: '5px'
        }

    },

    inputAdornment: {
        background: '#eeeeee',
        borderRadius: '5px 0px 0px 5px',

    },
    loginImg : {
        borderRadius: '5px',
        marginTop: '20px',
        marginLeft: '20px',
        marginBottom: '-20px'
    },
    loginImgHolder: {
        backgroundColor: "rgba(238,238,238,0.34)",

        borderRadius: '15px', marginBottom: 'auto'
    }

});


class ForgotPassword extends React.Component {

    state = {email: '', redirect: false, errorMessage: '', successMessage: '', tokenErrorMessage: ''};
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
                               style={{
                                   color: 'green',
                                   marginLeft: '5px',
                                   fontSize: '14px'
                               }}>{this.state.successMessage}</Typography>
        } else {
            return <Typography variant='body2' style={{color: 'red', display: 'none'}}>''</Typography>
        }

    };

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.validateInput();

    };

    forgotPasswordApiRequest = async (email)=>{
        const {data} = await backEndApi.post('/resetpassword',{params : email});
        const token = data;

        if (data === "notUser") {
            this.setState({errorMessage: "There is no registered user with the email address you have provided."})

        } else if (data === "Sent") {

            this.setState({errorMessage: "", successMessage: "Password Reset Email Successfully Sent."})
        } else {
            this.setState({errorMessage: "Problem resetting password. Please try again."})
        }

    };

    validateInput = () => {
        const logindetails = {
            email: this.state.email,
        };

        if (this.state.email) {
            var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


            if (!mailformat.test(this.state.email)) {

                this.setState({errorMessage: "The email that you have provided is invalid."});
            }
            this.forgotPasswordApiRequest(logindetails)
            /*/!*axios.post("http://localhost:5000/resetPassword", {params: logindetails},)*!/
            axios.post("https://damp-fjord-23317.herokuapp.com/resetPassword", {params: logindetails})
                .then(res => {
                    const token = res.data;

                    if (res.data === "notUser") {
                        this.setState({errorMessage: "There is no registered user with the email address you have provided."})

                    } else if (res.data === "Sent") {

                        this.setState({errorMessage: "", successMessage: "Password Reset Email Successfully Sent."})
                    } else {
                        this.setState({errorMessage: "Problem resetting password. Please try again."})
                    }
                })*/

        } else {
            this.setState({errorMessage: "Please fill all the inputs!"});
        }


    };

    /*componentDidMount() {
        if (this.props.location.state !== undefined) {
            let message = this.props.location.state.errorMessage;

            if (message === "Link Expired") {

                this.setState({errorMessage: "The email verification link You have provided have been expired please try to send again."});
            }
        }

    }*/


    render() {
        console.log(this.props);
        const {classes} = this.props;
        return (
            <Container maxWidth='lg'>
                <Grid container className={classes.root}>

                    <Grid item xs={12} md={5} className={classes.loginImgHolder} >
                        <img src={loginImage} alt="" height='420px' width='420px' className={classes.loginImg}/>
                    </Grid>
                    <Grid item xs={1} md={2}> {/*<Divider orientation='vertical'/>*/}</Grid>

                    <Grid item xs={12} md={5}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className={classes.paper}>

                                <Typography component="h1" variant="h5" style={{paddingBottom: '40px'}}>
                                    Reset Password
                                </Typography>

                                <form className={classes.form} noValidate onSubmit={this.onSubmit}>

                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        onChange={this.onEmailChange}
                                        autoComplete="email"
                                        autoFocus
                                        className={classes.textField}

                                    />


                                    {this.state.errorMessage ? this.errorcheck() : this.successCheck()}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        style={{textTransform: 'none'}}
                                    >
                                        Send verification code
                                    </Button>
                                    <Grid container justify='center'>

                                        <Grid item md={6}>
                                            <Box mt={4} style={{fontWeight: '800'}}>Don't have an account?
                                                <Link href="/signup" variant="body2">
                                                    {" Sign Up"}
                                                </Link></Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>

                        </Container>
                    </Grid>
                </Grid>
            </Container>
        );
    }

}

export default withStyles(useStyles)(ForgotPassword);
