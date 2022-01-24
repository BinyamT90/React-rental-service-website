import React from 'react'
import {AppBar, Button, Grid, Link, List, ListItem, Toolbar, Typography, withStyles} from "@material-ui/core/index";
import {Redirect} from "react-router-dom";
import withWidth, {isWidthDown} from '@material-ui/core/withWidth';
import {compose} from 'recompose';

const useStyles = ((theme) => ({
    root: {
        backgroundColor: '#eeeeee',
        maxHeight: 80,
        paddingRight: 10,
        paddingLeft: 20,
        boxShadow: 'opx 6px 10px rgba(0,0,0,0.15)',
        "&ul": {
            padding: '0px !important',
            margin: '0px !important',

        },
        "& li": {
            padding: 0,
            margin: 0,
            minWidth: 100,
            "& a": {
                width: '100%',
                textTransform: 'none',
                borderRadius: '5px',
                lineHeight: '26px',
                "& span": {
                    width: '100%'
                }

            },
        },

        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 10,
            maxHeight: '1000px',
            "& li": {
                marginBottom: '5px',
                backgroundColor: 'rgba(185,185,185,0.13)',
                "& a": {
                    width: '100%',
                    padding: '5px 20px ',
                    marginRight: '10px',
                    textTransform: 'none',
                    borderRadius: '5px',
                    lineHeight: '26px',
                    "& span": {
                        justifyContent: 'left'
                    }

                },
            },

        }

    },
    searchBar: {
        height: '40px',
        marginTop: '10px',

    },
    listContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    listContainerMobile: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    LogoTextNavbar:{
        display:'block', textDecoration:'none', color:'inherit'
    }

}));

class NavTabs extends React.Component {
    state = {isHumActive: false};
    onLogoutclicked = () => {
        localStorage.clear();
        return <Redirect to='/'/>

    };
    onButtonClick = () => {
        this.setState({isHumActive: !this.state.isHumActive})
    };
    isAuthnticated = () => {
        if (this.props.getToken()) {
            return (
                <React.Fragment>
                    <ListItem><Button href={process.env.PUBLIC_URL + '/'}>Home</Button> </ListItem>
                    <ListItem><Button href={process.env.PUBLIC_URL + '/addhouse'}>Add House</Button></ListItem>
                    <ListItem><Button href={process.env.PUBLIC_URL + '/dashboard'}>Dashboard</Button></ListItem>
                    <ListItem><Button href='/' onClick={this.onLogoutclicked}>logout</Button></ListItem>
                </React.Fragment>

            )
        } else {
            return (
                <React.Fragment>
                    <ListItem><Button href={process.env.PUBLIC_URL + '/'}>Home</Button> </ListItem>
                    <ListItem><Button href={process.env.PUBLIC_URL + '/register'}>Register</Button></ListItem>
                    <ListItem><Button href={process.env.PUBLIC_URL + '/about'}>About</Button></ListItem>
                    <ListItem><Button href={process.env.PUBLIC_URL + '/login'}>login</Button></ListItem>
                </React.Fragment>

            )
        }
    };

    navOptions = () => {
        const {classes} = this.props;

        if (isWidthDown('sm', this.props.width)) {
            if (this.state.isHumActive) {
                return (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                        flexDirection:"column",
                        flexWrap: 'wrap'
                    }}>
                        <div style={{display:"flex", justifyContent:'space-between',}}>
                            <div>
                                <h3 style={{fontSize: '30px', margin: 0, color: 'black'}}><a href={'/'} className={classes.LogoTextNavbar}><span
                                    style={{color: '#ee662d'}}>A</span>genagn</a></h3>
                            </div>
                            <div className={classes.hamburgerIcon}>
                                <button onClick={this.onButtonClick}>
                                    <i className="fas fa-bars fa-2x" style={{color: 'black'}}></i>
                                </button>
                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
                            <List className={classes.listContainerMobile}>
                                {this.isAuthnticated()}
                            </List>

                    </div>


                    </div>

                )
            } else {
                return (

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <div>
                            <h3 style={{fontSize: '30px', margin: 0, color: 'black'}}><a href={'/'} className={classes.LogoTextNavbar}><span
                                style={{color: '#ee662d'}}>A</span>genagn</a></h3>

                        </div>
                        {/*<Grid item sm={4} >
                            <SearchBar className={classes.searchBar}/>
                        </Grid>*/}
                        <div>
                            <div className={classes.hamburgerIcon}>
                                <button onClick={this.onButtonClick}>
                                    <i className="fas fa-bars fa-2x" style={{color: 'black'}}></i>
                                </button>
                            </div>
                        </div>


                    </div>

                )
            }

        } else {
            return (
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap'}}>
                    <div>
                        <div>
                            <h3 style={{fontSize: '30px', margin: 0, color: 'black'}}><a className={classes.LogoTextNavbar}  href={'/'}><span
                                style={{color: '#ee662d'}}>A</span>genagn</a></h3>

                        </div>
                    </div>
                    {/*<Grid item sm={4} >
                            <SearchBar className={classes.searchBar}/>
                        </Grid>*/}
                    <div>
                        <div style={{display: 'flex', alignItems: 'center'}}>

                            <List className={classes.listContainer}>
                                {this.isAuthnticated()}
                            </List>
                        </div>


                    </div>


                </div>
            )


        }
    };

    render() {

        const {classes} = this.props;
        return (
            <AppBar className={classes.root} position='fixed'>
                {this.navOptions()}


            </AppBar>

        );
    }

}

export default compose(withStyles(useStyles), withWidth())(NavTabs);


