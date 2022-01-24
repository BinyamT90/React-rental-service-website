import React from 'react';
import {Box, Button, Grid, IconButton, Typography, withStyles} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import backEndApi from "../../../services/api";
import Switch from "@material-ui/core/Switch";
import Tooltip from "@material-ui/core/Tooltip";
import AccountInfo from "./AccountInfo";
import Loader from "./Loader";
import ViewLaunchOnHover from './ViewLaunchOnHover'

const useStyles = theme => ({
    root: {
        marginTop: '20px',


    },
    table: {
        minWidth: 650,

    },
    tableContainer: {
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: '#eeeeee',
        overflow: 'visible'


    },
    listingStatusF: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    margin: {
        margin: '5px',
        fontSize: '15px',
        borderRadius: '4px',
        "&:hover": {backgroundColor: 'rgba(58,99,81,0.2)'},
    },
    iconBackgroundRed: {
        /*backgroundColor: 'rgba(228,130,87,0.21)'*/
    },
    deleteIcon: {
        color: '#005CC8'
    },
    editIcon: {
        color: '#005CC8'

    },
    iconBackgroundBlack: {
        backgroundColor: 'rgba(57,50,50,0.2)'
    },
});


class userDashboard extends React.Component {
    state = {homeDocs: [], userDetail: '', isSwitchOn: false, isHovering: false, hoveredLaunch: ''};
    ReviewStatusFilter = (status) => {
        switch (status) {

            case 'Approved' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(29,104,7,0.74)',
                        color: '#ffffff',
                        padding: '5px',
                        paddingRight: '40px',
                        paddingLeft: '40px',
                    }}>Approved</span>;
            case 'Pending' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(221,228,87,0.82)',
                        padding: '5px',
                        paddingRight: '20px',
                        paddingLeft: '20px'
                    }}>Pending Review</span>;
            case 'Rejected':
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(223,6,18,0.36)',
                        padding: '5px',
                        paddingRight: '20px',
                        paddingLeft: '20px'
                    }}>Rejected
                </span>
            case 'NA':
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(156,5,13,0.36)',
                        padding: '5px',
                        paddingRight: '20px',
                        paddingLeft: '20px'
                    }}>NA
                </span>
            default:
                return <div>Something occur</div>
        }

    };
    ListingStatusFilter = (status, id) => {
        switch (status) {

            case 'Active' :
                return <span id={id}
                             style={{
                                 textTransform: 'none',
                                 borderRadius: '12.5px',
                                 backgroundColor: 'rgba(58,99,81,0.2)',
                                 padding: '5px',
                                 paddingRight: '20px',
                                 paddingLeft: '20px'
                             }}>Active</span>;
            case 'Inactive' :
                return <span id={id}
                             style={{
                                 textTransform: 'none',
                                 borderRadius: '12.5px',
                                 backgroundColor: 'rgba(57,50,50,0.2)',
                                 padding: '5px',
                                 paddingRight: '20px',
                                 paddingLeft: '20px'
                             }}>Inactive</span>
            case 'Draft' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(57,50,50,0.2)',
                        padding: '5px',
                        paddingRight: '20px',
                        paddingLeft: '20px'
                    }}>Draft</span>;
            case 'Submitted' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(57,50,50,0.2)',
                        padding: '5px',
                        paddingRight: '20px',
                        paddingLeft: '20px'
                    }}>Submitted</span>;
            default:
                return <div>Something occur</div>
        }

    };
    onSwitchChange = async (e) => {
        console.log(e.target.name);
        console.log(e.target.checked);
        console.log(e.target.id);

        const nameTag = e.target.name;
        const switchId = e.target.name;

        const response = await backEndApi.post('/activateButton', {
            params: {
                isActive: e.target.checked,
                id: e.target.name
            }
        });
        console.log(response.data);
        window.location.reload(false);
        if (response.data === "Active") {
            /* document.getElementById(nameTag).innerText = 'Active';
             document.getElementById(switchId).checked = true;

             this.setState({isSwitchOn: true});*/

        } else if (response.data === "Inactive") {
            /*document.getElementById(nameTag).innerText = 'Inactive';
            document.getElementById(switchId).checked = false;

            this.setState({isSwitchOn:false})*/
        } else {
            alert("Unhandled Conditions");
        }
    };
    switchChecked = (row) => {

        /*row.id = */
        /* if(row.listingStatus === "Active") {

         }else{

         }*/
        return row.listingStatus === "Active"

    };
    componentWillMount = async () => {
        const config = {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('token')).token
            }
        };
        const response = await backEndApi.get('/dashboard', config);
        console.log(response.data);
        this.setState({homeDocs: response.data.homeDocs, userDetail: response.data.docs});

    };

    render() {
        const displaySwitch = (row) => {
            if (row.listingStatus === "Active" || row.listingStatus === "Inactive") {
                return <Tooltip title={"Activate"} placement="top-start" arrow>
                    <Switch
                        /*checked={this.switchChecked(row)}*//*{state.checkedA}*/
                        checked={this.switchChecked(row)}
                        onClick={this.onSwitchChange}/*{handleChange}*/
                        name={row._id}
                        id={row._id}
                        color={'primary'}
                        inputProps={{'aria-label': 'primary checkbox'}}


                    /></Tooltip>
            } else {
                return <Tooltip title={"Activate"} placement="top-start" arrow>
                    <Switch
                        /*checked={this.switchChecked(row)}*//*{state.checkedA}*/
                        disabled
                        onClick={this.onSwitchChange}/*{handleChange}*/
                        name={row._id}
                        id={row._id}
                        inputProps={{'aria-label': 'secondary checkbox'}}

                    /></Tooltip>
            }
        };
        if (!this.state.homeDocs) {
            /*window.location.reload()*/

        }
        /*const token = this.props.getToken();*/
        /*console.log(token);*/
        const {classes} = this.props;
        /* if (!token) {
             return <Redirect to='/login'/>
         }*/
        const productRow = () => (this.state.homeDocs ? this.state.homeDocs.map((row) => (
                    <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                            {row.location}

                        </TableCell>

                        <TableCell style={{textAlign: 'center'}} className={classes.listingStatusF}>

                            {this.ListingStatusFilter(row.listingStatus, row._id)}
                        </TableCell>

                        <TableCell style={{textAlign: 'center'}}>{this.ReviewStatusFilter(row.reviewStatus)}</TableCell>
                        <TableCell style={{textAlign: 'center'}}>
                            <IconButton aria-label="delete"
                                        className={[classes.margin, classes.iconBackgroundRed]}
                                        style={{padding:'5px' +
                                                ''}}
                                        size="small"
                                        href={"/editHouse/" + row._id}

                            >
                                <EditIcon fontSize="inherit" className={classes.editIcon}/>
                            </IconButton>
                            {/*<IconButton aria-label="delete"
                                    className={[classes.margin, classes.iconBackgroundRed]}
                                    size="small">
                            <DeleteIcon fontSize="inherit" className={classes.deleteIcon}/>
                        </IconButton>*/}


                            <span style={{position: 'relative', top: 'auto', zIndex: 9,}}>
                                            <span
                                                style={{
                                                    position: 'absolute',
                                                    right: '100%',
                                                    width: '600px',
                                                    height: '20px'
                                                }}>
                                                {this.state.isHovering && this.state.hoveredLaunch === row._id ?
                                                    <ViewLaunchOnHover row={row}/> : ''}
                                            </span>
                                    </span>
                            {/*onMouseLeave={()=>{this.handleHover(row._id)}}*/}
                            {/*{displaySwitch(row)}*/}


                            {/* {row.protein}*/}
                        </TableCell>
                    </TableRow>)) :
                <Loader/>
        );
        return (
            <Grid container className={classes.root} spacing={4}>
                <Grid item md={9}>
                    <Box>

                        <Grid container style={{marginBottom: '5px'}}>
                            <Grid item xs={3} md={3}>
                                <Typography variant='h5'>Your houses</Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}></Grid>
                            <Grid item xs={3} md={3} align='right'>
                                <Button id="addNewHouse" href='/addhouse' style={{
                                    background: '#005CC8',
                                    textTransform: 'none',
                                    color: '#ffffff',
                                    borderRadius: '5px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                }}>+ Add new house</Button>
                            </Grid>
                        </Grid>
                        <Box><TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant='h6' style={{fontSize: '16px'}}>Location</Typography>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}} className={classes.listingStatusF}>
                                            <Typography variant='h6' style={{fontSize: '16px'}} >Listing
                                                status</Typography>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}><Typography variant='h6'
                                                                                             style={{fontSize: '16px'}}>Review
                                            status</Typography></TableCell>{/*Fat&nbsp;(g)*/}

                                        <TableCell style={{textAlign: 'center'}} align='justify'><Typography
                                            variant='h6' style={{fontSize: '16px'}}>Action</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productRow()}

                                </TableBody>
                            </Table>
                        </TableContainer></Box>
                    </Box>
                </Grid>
                <Grid item md={3} style={{marginTop: '2px'}}>
                    <AccountInfo userDetail={this.state.userDetail}/>
                </Grid>
            </Grid>
        );
    }

}

export default withStyles(useStyles)(userDashboard);


