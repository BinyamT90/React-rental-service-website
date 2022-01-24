import React from 'react';
import {Checkbox, div, FormControlLabel, withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'

import backEndApi from '../../services/api'
import {Redirect} from "react-router-dom";

const SignupImage = process.env.PUBLIC_URL + '/img/image.png';

const useStyles = theme => ({
        container: {
            width: '100%',
            paddingLeft: '6px',
            paddingRight: '6px',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: 5,
                paddingRight: 5,
            }

        },
        root: {
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'nowrap',
            background: '#eeeeee',
            borderRadius: '15px',
            height:'600px',
            padding: 10,
            "& a": {
                color: '#3A6351',
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
            [theme.breakpoints.down('sm')]: {
                /*width:'80%'*/
            }
        },
        submit: {background: '#3F51B5',
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
            borderRadius:
                '7px 0px 0px 7px',

        },
        imgHolder: {
            marginTop: '20px',
            backgroundColor: "rgba(223,225,232,0.66)",
            borderRadius: '15px',
            marginBottom: 'auto',
            display: 'flex',
            height:'auto',
            paddingBottom:'50px',
            [theme.breakpoints.down('sm')]:
                {
                    display: 'none'
                }
        }
    })
;

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isCheck: false,
        errorMessage: '',
        successMessage: '',
        redirect: false,
    };
    onFormSubmit = (e) => {
        e.preventDefault();
        this.setState({errorMessage: ''});
        this.setState({successMessage: ''});

        this.validateInput();

    };
    signUpApiRequest = async (signUpDetails) => {
        const {data} = await backEndApi.post('/signUpUser', signUpDetails);
        if (data === "userExist") {
            this.setState({errorMessage: "The email that you have provided is already in use."})
        } else {
            this.setState({
                redirect: true,
                errorMessage: '',
                successMessage: 'You have successfully  Signed Up.'
            });


        }
    };
    validateInput = () => {
        const signUpUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };

        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


        if (this.state.name && this.state.email && this.state.password && this.state.confirmPassword) {
            if (this.state.password !== this.state.confirmPassword) {
                this.setState({errorMessage: "The passwords that you have entered does not match."})
            }else if (this.state.password.length<6){
                this.setState({errorMessage: "Password should be more than 6 characters"})
            }
            else if (!mailformat.test(this.state.email)) {

                this.setState({errorMessage: "The email that you have provided is invalid."})

            } else if (!this.state.isCheck) {
                this.setState({errorMessage: "You have to agree to the Privacy Policy and Terms Of Use."})
            } else {
                if (this.state.errorMessage === '') {
                    this.signUpApiRequest(signUpUser)
                    /*/!*axios.post('http://localhost:5000/signUpUser', signupUser)*!/
                    axios.post('https://damp-fjord-23317.herokuapp.com/signUpUser', signUpUser)
                        .then(res => {

                            }
                        )*/
                }
            }
        } else {
            this.setState({errorMessage: "Please fill all the inputs."})
        }


    };
    onNameChange = (e) => {
        this.setState({name: e.target.value});
    };
    onEmailChange = (e) => {
        this.setState({email: e.target.value});
    };
    onPasswordChange = (e) => {
        this.setState({password: e.target.value});
    };
    onConfirmPasswordChange = (e) => {
        this.setState({confirmPassword: e.target.value});
    };
    onCheckboxChange = (e) => {
        if (e.target.checked && this.state.errorMessage === "You Have to accept the Terms & PP") {
            this.setState({errorMessage: ''})
        }
        this.setState({isCheck: e.target.checked})
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
                               style={{color: 'green', marginLeft: '5px'}}>{this.state.successMessage}</Typography>
        } else {
            return <Typography variant='body2' style={{color: 'red', display: 'none'}}>''</Typography>
        }

    };

    render() {
        if (this.state.redirect) {
            return <Redirect to='/login'/>

        }/* if (this.state.redirect || this.props.getToken()) {
            return <Redirect to='/login'/>

        }*/
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.root}>

                    <div className={classes.imgHolder}>
                        <img src={SignupImage} alt="" width='93%' height='420px' style={{
                            borderRadius: '8px',
                            marginTop: '20px',
                            marginLeft: '20px',
                            marginBottom: '-20px',
                        }}/>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column',heigh:'auto'}}>

                        <Typography align='center' component="h1" variant="h5" style={{padding: 10}}>
                            Sign Up
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.onFormSubmit}>

                            <TextField
                                variant="outlined"
                                margin="none"
                                required
                                fullWidth
                                id="name"
                                onChange={this.onNameChange}
                                label="Name"
                                name="name"
                                autoFocus
                                className={classes.textField}

                            />
                            <TextField
                                variant="outlined"
                                margin="none"
                                required
                                fullWidth
                                id="email"
                                onChange={this.onEmailChange}
                                label="Email Address"
                                name="email"
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
                                inputProps={{
                                    minLength: 8,
                                }}
                                className={classes.textField}

                            />
                            <TextField
                                variant="outlined"
                                margin="none"
                                required
                                fullWidth
                                onChange={this.onConfirmPasswordChange}

                                label="Confirm Password"
                                name='confirmPassword'
                                type="password"
                                id="password"

                                className={classes.textField}

                            />

                            <FormControlLabel id="check"
                                control={<Checkbox value="remember" color="primary"
                                                   onChange={this.onCheckboxChange}/>}
                                label="I have read and agreed to Privacy Policy  & TOU"
                            />

                            {this.state.errorMessage ? this.errorcheck() : this.successCheck()}

                            <Button
                                id="SignUp"
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                            <div>

                                <div>
                                    <Box mt={4} style={{fontWeight: '800'}}>Already have an account
                                        <Link href="/login" variant="body2" id="goToLogin">
                                            {" Log in"}
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

export default withStyles(useStyles)(Signup);
