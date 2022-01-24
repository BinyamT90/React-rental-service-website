import React from 'react';
import {Container, Grid, withStyles} from "@material-ui/core";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import backEndApi from '../../../services/api'

import {Redirect} from "react-router-dom";

const loginImage = process.env.PUBLIC_URL + '/img/99.png';
const useStyles = theme => ({
    root: {

        /* backgroundColor: '#333',*/
        marginTop: '60px',
        padding: '50px !important',
        background: 'rgba(242,237,215,0.21)',
        borderRadius: '15px',
        "& a": {
            color: '#3A6351',
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
        borderRadius: '7px 0px 0px 7px',

    },
    loginImg: {
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


class ResetPassword extends React.Component {
    state = {
        password: '',
        confirmPassword: '',
        resetPasswordEmail: '',
        isPasswordChange: false,
        isValidToken: false,
        resetToken: '',
        errorMessage: '',
        successMessage: '',
    };
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

    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
    };
    onConfirmPasswordChange = (e) => {
        this.setState({confirmPassword: e.target.value})
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.validateInput();


    };
    resetPasswordApiRequest = async (loginDetails) => {
        const {data} = await backEndApi.post('/changepassword', {params: loginDetails});
        const token = data.token;
        if (data.message === "Password Changed") {
            this.setState({isPasswordChange: true});
            this.props.setToken({token: token});
        } else {
            this.setState({errorMessage: "There was a Problem on resetting password."})
        }
    };
    checkTokenApiRequest = async (token) => {
        const {data} = await backEndApi.post('/resetpasswordtoken', {params: token});
        console.log(data, 'what is this');
        switch (data) {
            case "Invalid Token" :
                this.setState({resetToken: "Invalid Token"});
                break;
            case "Token Expired":
                this.setState({resetToken: "Token Expired"});
                break;
            default:
                this.setState({resetPasswordEmail: data})

        }
    };
    validateInput = () => {
        const logindetails = {
            password: this.state.password,
            email: this.state.resetPasswordEmail
        };

        if (this.state.password && this.state.confirmPassword) {
            if (this.state.password === this.state.confirmPassword) {
                this.resetPasswordApiRequest(logindetails);
                /*/!*axios.post("http://localhost:5000/changePassword", {params: logindetails},)*!/
                axios.post("https://damp-fjord-23317.herokuapp.com/changePassword", {params: logindetails})
                    .then(res => {
                        const token = res.data.token;

                        if (res.data.message === "Password Changed") {
                            this.setState({isPasswordChange: true});
                            this.props.setToken({token : token});

                        }  else {
                            this.setState({errorMessage: "There was a Problem on resetting password."})
                        }
                    })*/
            } else {
                this.setState({errorMessage: 'The passwords that you have entered does not match.'})
            }


        } else {
            this.setState({errorMessage: "Please fill all the inputs!"});
        }


    };

    componentDidMount() {

        const token = this.props.match.params.id;
        console.log(token);
        this.checkTokenApiRequest(token);
        /*/!*axios.post('http://localhost:5000/resetPasswordToken', {params: {token: token}})*!/
        axios.post('https://damp-fjord-23317.herokuapp.com/resetPasswordToken', {params: {token: token}})

            .then(res => {
                console.log(res.data);
                switch (res.data) {
                    case "Invalid Token" :
                        this.setState({resetToken : "Invalid Token"});
                        break;
                    case "Token Expired":
                        this.setState({resetToken : "Token Expired"});
                        break;
                    default:
                        this.setState({resetPasswordEmail: res.data})

                }
            })*/
    }

    render() {
        if (this.state.resetToken === "Invalid Token") {
            return <Redirect to='/resetpassword'/>;
        } else if (this.state.resetToken === "Token Expired") {
            this.setState({errorMessage: 'Your email verification link has been expired please try to send again.'});
            return <Redirect to={{
                pathname: '/resetpassword',
                state: {errorMessage: "Link Expired"}
            }}/>;
        } else {
            console.log('switch break');
        }
        if (this.state.isPasswordChange) {
            return <Redirect to='/'/>
        }
        const {classes} = this.props;
        console.log('now here')
        return (
            <Container maxWidth='lg'>
                <Grid container className={classes.root}>

                    <Grid item xs={12} md={5} className={classes.loginImgHolder}>
                        <img src={loginImage} alt="" height='420px' className={classes.loginImg}/>
                    </Grid> {/*height='446px' width='490px' */}
                    <Grid item xs={1} md={2}> {/*<Divider orientation='vertical'/>*/}</Grid>

                    <Grid item xs={12} md={5}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className={classes.paper}>

                                <Typography component="h1" variant="h5" style={{paddingBottom: '40px'}}>
                                    Set New Password
                                </Typography>
                                {console.log('cooooooooooo')}

                                <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                                    {console.log('dooooooooooo')}


                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        name="password"
                                        onChange={this.onPasswordChange}

                                        label="New Password"
                                        type="password"
                                        id="New Password"
                                        autoComplete="current-password"
                                        className={classes.textField}

                                    />
                                    <TextField
                                        variant="outlined"
                                        margin="none"
                                        required
                                        fullWidth
                                        name="password"
                                        onChange={this.onConfirmPasswordChange}

                                        label="Confirm Password"
                                        type="password"
                                        id="confirmPassword"
                                        autoComplete="current-password"
                                        className={classes.textField}

                                    />
                                    {this.state.errorMessage ? this.errorcheck() : this.successCheck()}
                                    {console.log('qooooooooooo')}

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        style={{textTransform: 'none'}}
                                    >
                                        Change Password
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

export default withStyles(useStyles)(ResetPassword);
