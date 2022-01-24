import React from 'react';
import {Box, Grid, IconButton, Typography, withStyles} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './Loader.css'

const useStyles = theme => ({
    root: {
        marginTop: '20px',

    },
    table: {
        minWidth: 650,
        overflow: "hidden",

    },
    tableContainer: {
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: '#F2EDD7',

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
});


class Loader extends React.Component {
    state = {productDocs: [], userDetail: '', isSwitchOn: false};

    render() {

        /*const token = this.props.getToken();*/
        /*console.log(token);*/
        const {classes} = this.props;
        /* if (!token) {
             return <Redirect to='/login'/>
         }*/

        return (
            <Grid container className={classes.root} spacing={4}>
                <Grid item md={9}>
                    <Box>

                        <Grid container style={{marginBottom: '5px', overflow:'hidden'}}>
                            <Grid item xs={3} md={3}>
                                <Typography variant='h5'>
                                    <div className="card_description loading"></div>
                                </Typography>
                            </Grid>
                            <Grid item xs={6} sm={6} md={6}></Grid>
                            <Grid item xs={3} md={3} align='right'>
                                <div href='/newListing' style={{}}>
                                    <div className="card_description loading"></div>
                                </div>
                            </Grid>
                        </Grid>
                        <Box><TableContainer component={Paper} className={classes.tableContainer}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>

                                        <TableCell>
                                            <Typography variant='h6' style={{fontSize: '16px'}}>
                                                <div className="card_description loading"></div>

                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>
                                            <Typography variant='h6' style={{fontSize: '16px'}}>
                                                <div className="card_description loading"></div>
                                            </Typography>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}><Typography variant='h6'
                                                                                             style={{fontSize: '16px'}}>
                                            <div className="card_description loading"></div>
                                        </Typography></TableCell>
                                        <TableCell style={{textAlign: 'center'}}><Typography variant='h6'
                                                                                             style={{fontSize: '16px'}}>
                                            <div className="card_description loading"></div>
                                        </Typography></TableCell>
                                        <TableCell style={{textAlign: 'center'}} align='justify'><Typography
                                            variant='h6' style={{fontSize: '16px'}}>
                                            <div className="card_description loading"></div>
                                        </Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/*{productRow()}*/}
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                            {/*<div>
                                                <IconButton aria-label="delete"
                                                            className={[classes.margin, classes.iconBackgroundRed]}
                                                            size="small"
                                                            href={"/editListing/" + row._id}

                                                >
                                                    <EditIcon fontSize="inherit" className={classes.editIcon}/>
                                                </IconButton>
                                                <IconButton aria-label="delete"
                                    className={[classes.margin, classes.iconBackgroundRed]}
                                    size="small">
                            <DeleteIcon fontSize="inherit" className={classes.deleteIcon}/>
                        </IconButton>


                                                <IconButton style={{margin: '0px', padding: '0px'}}><UpgradePopUp row={row} userDetail={this.state.userDetail}/></IconButton>
                                                <Tooltip title={"\n" +
                                                "  Price: $"+row.productPrice+"\n" +
                                                "  Commission: "+row.productCommission+"% \n" +
                                                "  VendorName: "+row.productVendorName+"\n" +
                                                "  Network: "+row.productNetwork +"\n" +
                                                "  LaunchDate: "+row.productLaunchDate+"\n" +
                                                "  Description: "+row.productDescription+"\n" +
                                                "  noteToReviewer:"+row.noteToReviewer+"\n"
                                                } placement="top-start" arrow style={{maxWidth:'50px'}}>
                                                    <IconButton
                                                        className={[classes.margin, classes.iconBackgroundBlack]}
                                                        size='small'>
                                                        <VisibilityIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>

                                                {displaySwitch(row)}


                                            </div>*/}
                                            {/* {row.protein}*/}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                            {/*<div>
                                                <IconButton aria-label="delete"
                                                            className={[classes.margin, classes.iconBackgroundRed]}
                                                            size="small"
                                                            href={"/editListing/" + row._id}

                                                >
                                                    <EditIcon fontSize="inherit" className={classes.editIcon}/>
                                                </IconButton>
                                                <IconButton aria-label="delete"
                                    className={[classes.margin, classes.iconBackgroundRed]}
                                    size="small">
                            <DeleteIcon fontSize="inherit" className={classes.deleteIcon}/>
                        </IconButton>


                                                <IconButton style={{margin: '0px', padding: '0px'}}><UpgradePopUp row={row} userDetail={this.state.userDetail}/></IconButton>
                                                <Tooltip title={"\n" +
                                                "  Price: $"+row.productPrice+"\n" +
                                                "  Commission: "+row.productCommission+"% \n" +
                                                "  VendorName: "+row.productVendorName+"\n" +
                                                "  Network: "+row.productNetwork +"\n" +
                                                "  LaunchDate: "+row.productLaunchDate+"\n" +
                                                "  Description: "+row.productDescription+"\n" +
                                                "  noteToReviewer:"+row.noteToReviewer+"\n"
                                                } placement="top-start" arrow style={{maxWidth:'50px'}}>
                                                    <IconButton
                                                        className={[classes.margin, classes.iconBackgroundBlack]}
                                                        size='small'>
                                                        <VisibilityIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>

                                                {displaySwitch(row)}


                                            </div>*/}
                                            {/* {row.protein}*/}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                            {/*<div>
                                                <IconButton aria-label="delete"
                                                            className={[classes.margin, classes.iconBackgroundRed]}
                                                            size="small"
                                                            href={"/editListing/" + row._id}

                                                >
                                                    <EditIcon fontSize="inherit" className={classes.editIcon}/>
                                                </IconButton>
                                                <IconButton aria-label="delete"
                                    className={[classes.margin, classes.iconBackgroundRed]}
                                    size="small">
                            <DeleteIcon fontSize="inherit" className={classes.deleteIcon}/>
                        </IconButton>


                                                <IconButton style={{margin: '0px', padding: '0px'}}><UpgradePopUp row={row} userDetail={this.state.userDetail}/></IconButton>
                                                <Tooltip title={"\n" +
                                                "  Price: $"+row.productPrice+"\n" +
                                                "  Commission: "+row.productCommission+"% \n" +
                                                "  VendorName: "+row.productVendorName+"\n" +
                                                "  Network: "+row.productNetwork +"\n" +
                                                "  LaunchDate: "+row.productLaunchDate+"\n" +
                                                "  Description: "+row.productDescription+"\n" +
                                                "  noteToReviewer:"+row.noteToReviewer+"\n"
                                                } placement="top-start" arrow style={{maxWidth:'50px'}}>
                                                    <IconButton
                                                        className={[classes.margin, classes.iconBackgroundBlack]}
                                                        size='small'>
                                                        <VisibilityIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>

                                                {displaySwitch(row)}


                                            </div>*/}
                                            {/* {row.protein}*/}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                        </TableCell>

                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>
                                            <div className="card_description loading"></div>
                                        </TableCell>
                                        <TableCell style={{textAlign: 'center'}}>

                                            <div className="card_description loading"></div>

                                            {/*<div>
                                                <IconButton aria-label="delete"
                                                            className={[classes.margin, classes.iconBackgroundRed]}
                                                            size="small"
                                                            href={"/editListing/" + row._id}

                                                >
                                                    <EditIcon fontSize="inherit" className={classes.editIcon}/>
                                                </IconButton>
                                                <IconButton aria-label="delete"
                                    className={[classes.margin, classes.iconBackgroundRed]}
                                    size="small">
                            <DeleteIcon fontSize="inherit" className={classes.deleteIcon}/>
                        </IconButton>


                                                <IconButton style={{margin: '0px', padding: '0px'}}><UpgradePopUp row={row} userDetail={this.state.userDetail}/></IconButton>
                                                <Tooltip title={"\n" +
                                                "  Price: $"+row.productPrice+"\n" +
                                                "  Commission: "+row.productCommission+"% \n" +
                                                "  VendorName: "+row.productVendorName+"\n" +
                                                "  Network: "+row.productNetwork +"\n" +
                                                "  LaunchDate: "+row.productLaunchDate+"\n" +
                                                "  Description: "+row.productDescription+"\n" +
                                                "  noteToReviewer:"+row.noteToReviewer+"\n"
                                                } placement="top-start" arrow style={{maxWidth:'50px'}}>
                                                    <IconButton
                                                        className={[classes.margin, classes.iconBackgroundBlack]}
                                                        size='small'>
                                                        <VisibilityIcon fontSize="inherit"/>
                                                    </IconButton>
                                                </Tooltip>

                                                {displaySwitch(row)}


                                            </div>*/}
                                            {/* {row.protein}*/}
                                        </TableCell>
                                    </TableRow>

                                </TableBody>

                            </Table>
                        </TableContainer></Box>
                    </Box>
                </Grid>
                <Grid item md={3} style={{marginTop: '2px'}}>
                    <Grid container>
                        <Grid item md={6} style={{marginBottom: '5px'}}>
                            <Typography variant='h5' style={{
                            }}>
                                <div className="card_description loading"></div>

                            </Typography>
                        </Grid>

                        <Grid item md={6} align='right'>
                            {/*<IconButton aria-label="delete"
                                        className={[classes.margin, classes.iconBackgroundRed]}
                                        size="small">
                                <EditIcon fontSize="inherit" className={classes.editIcon}/>
                            </IconButton>*/}
                        </Grid>

                    </Grid>
                    <Box>
                        <div style={{
                            backgroundColor: '#f2edd7',
                            boxShadow: '-9px 9px 16px rgba(0, 0, 0, 0.05)',
                            borderRadius: '5px',
                            overflow: "hidden",
                            paddingRight: '30px',
                        }}>

                            <div style={{
                                marginBottom: '20px',
                                marginTop: '3px',

                                paddingTop: '20px'
                            }}>


                                <Typography variant='h6' style={{display: 'inline', fontSize: '16px'}}>
                                    <div className="card_description loading"></div>
                                </Typography>
                                <div>
                                    <div className="card_description loading"></div>

                                </div>
                            </div>
                            <div style={{marginBottom: '20px'}}>


                                <Typography variant='h6'
                                            style={{display: 'inline', fontSize: '16px'}}>
                                    <div className="card_description loading"></div>
                                </Typography>
                                <div style={{}}>
                                    <div className="card_description loading"></div>
                                </div>
                            </div>
                            <div>
                                <Box>
                                    <Grid container>
                                        <Grid item md={12} style={{}}><Typography variant='h6'
                                                                                  style={{fontSize: '16px'}}>
                                            <div className="card_description loading"></div>
                                        </Typography>
                                        </Grid>
                                        <Grid item md={12} align='right' style={{marginBottom: '50px'}}>
                                            <div className="card_description loading"></div>
                                        </Grid></Grid>
                                </Box>


                            </div>

                        </div>
                    </Box>
                </Grid>
            </Grid>
        );
    }

}

export default withStyles(useStyles)(Loader);
/*

<div className="row">
    <div className="container">
        <div className="grid-row grid-4-4">
            <div className="cards">
                <div className="card_image loading"></div>
                <div className="card_title loading"></div>
                <div className="card_description loading"></div>
            </div>


        </div>
    </div>
</div>*/
