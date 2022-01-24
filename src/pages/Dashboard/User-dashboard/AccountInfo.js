import React from 'react';
import {Box, Card, CardContent, Grid, IconButton, Typography, withStyles} from '@material-ui/core';
import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from '@material-ui/icons/Email';
import backEndApi from "../../../services/api";

const useStyles = theme => ({
    personIcon: {
        background: '#F2EDD7',
        color: '#005CC8',
        marginRight: '5px',
        marginBottom: '-3px',
        fontSize: '15px',
        borderRadius: '4px',
    },
    emailIcon: {
        background: '#F2EDD7',
        color: '#005CC8',
        marginRight: '5px',
        marginBottom: '-3px',
        fontSize: '15px',
        borderRadius: '4px',
    },
    accountInfoHolder: {
        marginTop: '-2px',
        backgroundColor: '#eeeeee',
        boxShadow: '-9px 9px 16px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px'
    },
    accountNameHolder: {
        marginBottom: '20px',
        marginTop: '3px',
        marginLeft: '15px',
        paddingTop: '20px'
    },
    textName: {
        display: 'inline',
        fontSize: '16px'
    },
    textEmail: {
        display: 'inline',
        fontSize: '16px'
    },
    plusIcon: {
        backgroundColor: '#3A6351',
        borderRadius: '4px',
        color: '#F2EDD7',
        padding: '5px 20px 5px 20px'
    },
    creditTypeHolder: {
        borderRadius: '5px',
        backgroundColor: '#F2EDD7',
        border: '0.5px solid rgba(228, 130, 87, 0.8)',
        height: '40px',
        margin: '10px'
    },
    creditText: {
        backgroundColor: 'rgba(57,50,50,0.2)',
        padding: '4px 8px 4px 8px',
        borderRadius: '5px'
    }
});


class AccountInfo extends React.Component {
    onAddCreditClicked = async () => {
        await backEndApi.post('./addCredit', {id: this.props.userDetail._id});
        window.location.reload(false);
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container>
                    <Grid item md={6} style={{marginBottom: '5px'}}>
                        <Typography variant='h5' style={{
                            display: 'inline'
                        }}> Account
                            Info</Typography>
                    </Grid>

                    <Grid item md={6} align='right'>
                        {/*<IconButton aria-label="delete"
                                        className={[classes.margin, classes.iconBackgroundRed]}
                                        size="small">
                                <EditIcon fontSize="inherit" className={classes.editIcon}/>
                            </IconButton>*/}
                    </Grid>

                </Grid>
                <Box container className={classes.accountInfoHolder}>
                    <div>
                        <div className={classes.accountNameHolder}>

                            <PersonIcon fontSize="inherit" className={classes.personIcon}/>

                            <Typography variant='h6' className={classes.textName}>
                                Name
                            </Typography>
                            <div style={{marginLeft: '20px',}}>{this.props.userDetail.name}</div>
                        </div>
                        <div style={{marginBottom: '20px', marginLeft: '15px'}}>

                            <EmailIcon fontSize="inherit" className={classes.emailIcon}/>

                            <Typography variant='h6' className={classes.textEmail}
                            >Email</Typography>
                            <div style={{marginLeft: '20px'}}>{this.props.userDetail.email}</div>
                        </div>

                    </div>
                </Box>
            </div>
        );
    }

}

export default withStyles(useStyles)(AccountInfo);