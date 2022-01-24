import React from 'react';
import {Box, Button, FormControl, FormControlLabel, Grid, Typography, withStyles} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import backEndApi from '../../../services/api'
import MyModal from './Modal';
import {Redirect} from "react-router-dom";

const useStyles = theme => ({
    root: {
        display:'flex',
        flexWrap:'warp',
        flexDirection:'row',
        justifyContent:'space-around',
        gap:'20px',
        marginTop: '20px',
        [theme.breakpoints.down('sm')]: {
            flexDirection:'column'
        },
        '& span': {fontSize:'clamp(0.8rem, -0.075rem + 1.533vw, 1.2rem)'},

        '& th':{
            fontSize:'clamp(0.7rem, -0.075rem + 1.533vw, 1rem)',
        },
    },
    table: {
    },
    tableContainer: {
        display:'flex',
        width:'100%',
        justifyContent:'space-around',
        padding: '10px',
        borderRadius: '5px',
        backgroundColor: '#eeeeee',


    },
    margin: {
        margin: '5px',
        fontSize: '15px',
        borderRadius: '4px',
        "&:hover": {backgroundColor: '#3A6351'},
    },
    iconBackgroundRed: {
        backgroundColor: 'rgba(228,130,87,0.21)'
    },
    deleteIcon: {
        color: '#F24545'
    },
    editIcon: {
        color: '#E48257'

    },
    iconBackgroundBlack: {
        backgroundColor: 'rgba(57,50,50,0.2)'
    },
    formControlLabel: {
        marginTop: '8px',
        marginBottom: '8px',
        display: 'flex',
        padding: '5px 0',
        justifyContent: "space-between",
        "& span": {},

        "& svg": {
            boxSizing: 'border-box',
            borderRadius: '0px',

        },
        "& .MuiRadio-colorPrimary.Mui-checked": {
            color: 'rgb(90,109,255)',

        },
        "& .MuiRadio-root": {
            color: '#747474',

        }

    },
    formControlCustom: {
        marginTop: '5px'
    },
    allLaunchesLabel: {
        border: '0.5px solid rgba(228, 130, 87, 0.3)',
        borderRadius: '5px',

    },
    myCheckbox: {
        marginLeft: '125px',
        width: '22px',
        height: '22px',
        boxSizing: 'border-box',
        borderRadius: '4px',

        "& .Mui-checked": {
            border: '0px solid #393232'
        }
    },

    submittedDateF: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    listingFilters:{
        minWidth:'350px',
        [theme.breakpoints.down('xs')]: {
            minWidth: '100%'
        }

    }
});


class AdminDashboard extends React.Component {
    state = {homeDocs: [], isReRender: false, filterSelected: '', isRedirect:false, redirectTo:''};
    componentDidMount = async () => {
        const config = {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('token')).token
            }
        };
        const response = await backEndApi.get('/dashboard', config);
        console.log(response.data);
        this.setState({
            homeDocs: response.data.homeDocs,

        });
    };

    onRadioGroupChange = async (e) => {
        console.log(e.target.value);
        this.setState({filterSelected: e.target.value});
        const config = {
            headers: {
                'x-access-token': JSON.parse(localStorage.getItem('token')).token
            },
            params: {filter: e.target.value}
        };
        const response = await backEndApi.get('/dashboard', config);
        this.setState({homeDocs: response.data.homeDocs});
        console.log(response.data.product)
    };
    ReviewStatusFilter = (status) => {
        switch (status) {

            case 'Approved' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(58,99,81,0.2)',
                        padding: '5px',
                        paddingRight: '40px',
                        paddingLeft: '40px'
                    }}>Approved</span>;
            case 'Pending' :
                return <span
                    style={{
                        textTransform: 'none',
                        borderRadius: '12.5px',
                        backgroundColor: 'rgba(243,251,96,0.28)',
                        padding: '5px 25px',

                    }}>Pending</span>;
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
            default:
                return <div>Something occur</div>
        }

    };
    reRender = (isReRender) => {
        this.setState({isReRender: isReRender})
    };
    onTableRowClick = (row) =>{
        console.log(row._id);
        this.setState({isRedirect:true,redirectTo:row._id})
    };
    render() {
        const {classes} = this.props;
        if(this.state.isRedirect){
          return  <Redirect
                to={`/adminDetail/${this.state.redirectTo}`}
            />
        }
        if (this.state.isReRender) {
            window.location.reload(false);

        }
        return (
            <div  className={classes.root} spacing={4}>
                <div  style={{width:'100%'}} >
                    <div>
                        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                            <div style={{alignSelf:'center'}}>
                                <span style={{marginBottom:'20px'}}>All Listing Reviews</span>
                            </div>
                            <div >
                                <Button id="addNewHouse" href='/addhouse' style={{
                                    background: '#005CC8',
                                    textTransform: 'none',
                                    color: '#F2EDD7',
                                    borderRadius: '5px',
                                    paddingLeft: '20px',
                                    paddingRight: '20px',
                                }}>+ Add new house</Button>
                            </div>

                        </div>
                        <Box>
                            <TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow id="userInfo">
                                        <TableCell>
                                            <span  >Product name</span>
                                        </TableCell>
                                        <TableCell style={{textAlign:'center'}} className={classes.submittedDateF} >
                                            <span  >Submitted Date</span>
                                        </TableCell>
                                        <TableCell style={{textAlign:'center'}}>
                                            <span >Review
                                            status</span>
                                        </TableCell>{/*Fat&nbsp;(g)*/}
                                        <TableCell style={{textAlign:'center'}}  >
                                            <span
                                             >Action</span>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {this.state.homeDocs?
                                        this.state.homeDocs.map((row) => (
                                            <TableRow key={row._id} onClick={()=>this.onTableRowClick(row)}  style={{cursor:'pointer'}}>
                                                <TableCell component="th" scope="row" style={{ width:'15%'}}>
                                                    {row.location}
                                                </TableCell>

                                                <TableCell style={{textAlign:'center', width:'20%'}} className={classes.submittedDateF}>
                                                    {moment(row.dateCreated).format("D/M/yyyy")}

                                                </TableCell>

                                                <TableCell style={{textAlign:'center',width:'20%'}}>{this.ReviewStatusFilter(row.reviewStatus)}</TableCell>
                                                <TableCell style={{textAlign:'center',width:'20%'}}>

                                                    <div>
                                                        {/* <IconButton aria-label="delete"
                                                                    className={[classes.margin, classes.iconBackgroundRed]}
                                                                    size="small">
                                                            <EditIcon fontSize="inherit" className={classes.editIcon}/>
                                                        </IconButton>
                                                        <IconButton aria-label="delete"
                                                                    className={[classes.margin, classes.iconBackgroundRed]}
                                                                    size="small">
                                                            <DeleteIcon fontSize="inherit"
                                                                        className={classes.deleteIcon}/>
                                                        </IconButton>*/}
                                                        <MyModal docs={row} reRender={this.reRender}/>


                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        )):""}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Box>
                    </div>
                </div>
                <div className={classes.listingFilters}>
                    <div >
                        <div item >
                            <span  style={{marginBottom:'9px'
                            }}> Listing Filters</span>
                        </div>

                    </div>
                    <div  style={{
                        marginTop: '10px',
                        backgroundColor: '#eeeeee',

                        boxShadow: '-9px 9px 16px rgba(0, 0, 0, 0.05)',
                        borderRadius: '5px'
                    }}>
                        <div>
                            <FormControl required component="fieldset" className={classes.formControlCustom}>
                                <RadioGroup aria-label='gender' name='Listing' onChange={this.onRadioGroupChange}>


                                    {/*<FormControlLabel
                                        control={<Radio name="Construction" color='primary'
                                                        className={classes.myCheckbox}/>}

                                        value="Sort by name"
                                        label="Sort by name"
                                        labelPlacement='start'
                                        className={classes.formControlLabel}


                                    />*/}

                                    <FormControlLabel

                                        id="Pending"
                                        control={<Radio name="Construction" color='primary'
                                                        className={classes.myCheckbox}/>}
                                        value="Pending"
                                        label="Pending Review"
                                        labelPlacement='start'
                                        className={classes.formControlLabel}


                                    />
                                    <FormControlLabel

                                        id="Rejected"
                                        control={<Radio name="Construction" color='primary'
                                                        className={classes.myCheckbox}/>}
                                        value="Rejected"
                                        label="Rejected"
                                        labelPlacement='start'
                                        className={classes.formControlLabel}


                                    />

                                    <FormControlLabel
                                        id="Approved"
                                        control={<Radio name="Construction" color='primary'
                                                        className={classes.myCheckbox}/>}
                                        value="Approved"
                                        label="Approved"
                                        labelPlacement='start'
                                        className={classes.formControlLabel}

                                    />
                                    <FormControlLabel

                                        control={<Radio name="Construction" color='primary'
                                                        className={classes.myCheckbox} id="AllStatus"/>}
                                        value="All Status"
                                        label="All Status"
                                        labelPlacement='start'
                                        className={classes.formControlLabel}


                                    />
                                    <FormControlLabel

                                        control={<Radio name="Construction" color='primary'
                                                        className={classes.myCheckbox} id="SortByDate" />}
                                        value='Sort by date'
                                        label="Sort by date"
                                        labelPlacement='start'
                                        className={classes.formControlLabel}


                                    />

                                </RadioGroup>
                                {/*<Box mt={4}>
                                        <Typography align='center'>
                                            <Button style={{textTransform: 'none',}}>See More</Button>
                                        </Typography></Box>*/}

                            </FormControl>

                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default withStyles(useStyles)(AdminDashboard);

