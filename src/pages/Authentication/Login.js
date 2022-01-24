import React from 'react';
import {div, withStyles} from "@material-ui/core";
import {Redirect} from "react-router-dom";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import backEndApi from '../../services/api'

const loginImage = process.env.PUBLIC_URL + '/img/image.png';
const useStyles = theme => ({
    container: {
        width: '100%',
        paddingLeft: '16px',
        paddingRight: '16px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 5,
            paddingRight: 5,
        }

    },
    root: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        background: 'rgba(238,238,238,0.87)',
        borderRadius: '15px',
        height: '100vh',
        padding: 10,
        "& a": {
            color: -'#5066e4',
        },

        [theme.breakpoints.down('sm')]: {
            "& form":{
                padding:0
            }
        }
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '40vh',
        width: '100%',
        [theme.breakpoints.down('sm')]: {}
    },
    submit: {
        background: '#3F51B5',
        borderRadius:
            '5px',
        width:
            '100%',
        height:
            '50px',
        margin:
            theme.spacing(3, 0, 2),
        "&:hover":
            {
                background: 'rgba(53,68,152,0.79)',
            }
    },
    textField: {
        margin: '10px 0',
        borderRadius: '5px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        border: '0px solid #eee',
        borderLeftWidth: '7px',
        borderLeftColor: 'rgba(215,215,215,0.87)',
        "& input": {
            color: "rgba(57,50,50,0.25)",
            border: '0px solid #eee',
            borderRadius: '30px',
            width: '100%',
        },
    },

    inputAdornment: {
        background: 'rgba(215,215,215,0.87)',
        borderRadius: '7px 0px 0px 7px',

    },
    loginImg: {
        borderRadius: '8px',
        marginTop: '20px',
        marginLeft: '20px',
        marginBottom: '-20px',
    },
    loginImgHolder: {
        marginTop: '20px',
        backgroundColor: "rgba(185,194,226,0.66)",
        borderRadius: '15px',
        marginBottom: 'auto',
        display: 'flex',
        [theme.breakpoints.down('sm')]:
            {
                display: 'none'
            }
    },
    formHolder: {
        display: 'flex', flexDirection: 'column',
        width: '35%',
        marginTop: 40,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: 10,

        }
    }

});


class Login extends React.Component {
    state = {email: '', password: '', redirect: false, errorMessage: '', token: ''};
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

    onEmailChange = (e) => {
        this.setState({email: e.target.value})
    };
    onPasswordChange = (e) => {
        this.setState({password: e.target.value})
    };
    loginApiRequest = async (loginParams) => {
        const {data} = await backEndApi.post('/loginUser', {params: loginParams});
        const token = data;
        if (data === "notUser") {
            this.setState({errorMessage: "Incorrect Username or Password!"});

        } else {

            this.props.setToken(token);
            this.setState({token: token, redirect: true});
        }

    };
    validateInput = () => {
        const logindetails = {
            email: this.state.email,
            password: this.state.password,
        };

        if (this.state.email && this.state.password) {
            this.loginApiRequest(logindetails);
            /*/!*axios.post("http://localhost:5000/getUser", {params: logindetails })*!/
            axios.post("https://damp-fjord-23317.herokuapp.com/getUser", {params: logindetails})
                .then(res => {
                    const token = res.data;
                    if (res.data === "notUser") {
                        this.setState({errorMessage: "Incorrect Username or Password!"});

                    } else {

                        this.props.setToken(token);
                        this.setState({token:token,redirect: true});
                    }
                })*/

        } else {
            this.setState({errorMessage: "Please fill all the inputs!"})
        }


    };
    onSubmit = (e) => {
        e.preventDefault();
        this.validateInput();
        /* const getUsers = async () => {
         /!*let res = await axios.post("https://reqres.in/api/users?page=1",{params:logindetails});*!/
         let res = await axios.post("http://localhost:5000/getUser",{params:logindetails});
         let { data } = res.data;
         console.log(data);
         console.log("this is printed");
         /!*this.setState({ users: data });*!/
     };
         getUsers()*/

    };

    componentDidMount() {
        const token = this.props.getToken();
        console.log(token);
        if (token) {
            console.log("welcome Mr ");
            return <Redirect to='/addhouse'/>

        }
    }

    render() {
        if (this.state.redirect || this.props.getToken()) {
            console.log("welcome Mr ");
            return <Redirect to='/dashboard'/>
        }
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.root}>

                    <div className={classes.loginImgHolder}>
                        <img src={loginImage} alt="" width='93%' height='420px' className={classes.loginImg}/>

                    </div>

                    <div className={classes.formHolder}>

                        <Typography align='center' component="h1" variant="h5" style={{padding: 10}}>
                            Login
                        </Typography>
                        <form className={classes.form} noValidate>

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

                            <TextField
                                variant="outlined"
                                margin="none"
                                required
                                fullWidth
                                name="password"
                                onChange={this.onPasswordChange}

                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"

                                className={classes.textField}

                            />
                            {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary"
                                                   onChange={this.onCheckboxChange}/>}
                                label="I have read and agreed to Privacy Policy  & TOU"
                            />*/}
                            <Box align='right'>
                                <Link href="/resetPassword" variant="body2">
                                    Forgot password?
                                </Link>
                            </Box>
                            {this.errorcheck()}

                            <Button
                                id="login"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={this.onSubmit}
                            >
                                Log in
                            </Button>
                            <div container justify='center'>

                                <div item md={6}>
                                    <Box mt={4} style={{fontWeight: '800'}}>Don't have an account?
                                        <Link href="/signup" variant="body2" id="gotoSignup">
                                            {" Sign Up"}
                                        </Link></Box>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        );
    }

}

export default withStyles(useStyles)(Login);
