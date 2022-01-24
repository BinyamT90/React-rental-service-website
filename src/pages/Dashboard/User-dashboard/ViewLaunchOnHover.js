import React from 'react'
import {Avatar, Box, Button, Card, CardContent, Grid, Typography, withStyles} from "@material-ui/core";
import moment from "moment";

const useStyles = (theme) => ({

    PremiumCardTitle: {
        background: 'rgba(58,99,81,0.31)',
        marginBottom: '20px',
        width: '233px ',
        marginTop: '-10px',
        height: '86px ',
        borderRadius: '0px 0px 100px 100px',
        borderBottom: '0px solid #F2EDD7',
        borderLeft: '10px solid #F2EDD7',
        borderRight: '10px solid #F2EDD7',

        "& span": {
            position: 'relative',
            top: '20px'
        }
    },
    otherLauchesCardTitle: {
        marginBottom: '20px',
        width: '233px ',
        marginTop: '-10px',
        height: '86px ',
        borderRadius: '5px',
        "& span": {
            position: 'relative',
            top: '20px'
        }
    },

    card: {

        backgroundColor: '#F2EDD7',

        boxShadow: ' -9px 9px 16px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px',

    },
    listCard: {

        height: '104px',
        backgroundColor: 'rgba(228, 130,87, 0.2)',
        marginBottom: '10px',
        border: '0.5px solid rgba(228, 130, 87, 0.6)',
        boxSizing: 'border-box',
        borderRadius: '5px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            minHeight: '175px',
        }

    },
    listCardContent: {},
    cardDate: {
        backgroundColor: '#393232',
        color: "#F2EDD7",
        opacity: 0.8,
        borderRadius: '5px',
        width: '45px',
        marginTop: '5px',
        padding: '7px 0px',
        textAlign: 'center',
        fontSize: '10px',
        lineHeight: '14px',
    },
    listCardTitle: {
        color: '#393232',
        fontWeight: 800,
        fontSize: '18px',
        lineHeight: '26px',
        overflow: 'hidden',
        maxHeight: '30px',
        [theme.breakpoints.down('sm')]: {
            overflow: 'visible',
            maxHeight: '50px'

        },
    },
    smallText: {
        fontSize: '10px',
        lineHeight: '14px'
    },
    listCardSubTitle: {
        opacity: '0.5',
        display: 'inline',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    listCardLorem: {
        color: '#393232',
        fontWeight: 'normal',
        wordBreak:'break-all',
        fontSize: '10px',
        lineHeight: '14px',
        maxHeight: '30px',
        height: '30px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            maxHeight: '42px',
        },

    },
    listCardLeft: {
        backgroundColor: 'rgba(57,50,50,0.05)',
        margin: '-5px 0px 0px 0px',
        padding: '10px 10px 10px 25px',
        borderRadius: '5px',
        [theme.breakpoints.down('sm')]: {
            height: '47px',
        }
    },
    listCardFooter: {
        marginTop: '10px',
        marginBottom: '10px',
        opacity: '0.5',
        fontWeight: 'normal',
        fontSize: '10px',
        lineHeight: '14px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '5px'
        }

    },
    centerPartCard: {
        paddingLeft: '10px',
        overflow: 'hidden',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '25px',

        }

    },
    promoteButton: {
        background: '#3A6351',
        borderRadius: '5px',
        marginLeft: '5px',
        fontStyle: 'normal',
        fontSize: '12px',
        fontWeight: '600',
        lineHeight: '14px',
        color: '#F2EDD7',
        height: '25px',
        width: '73px',
        textTransform: 'none',
        [theme.breakpoints.down('sm')]: {
            marginLeft: '30px',
            marginTop: '5px'

        },
        "&:hover": {
            background: 'rgb(37,64,48)'
        }
    },


    textProductCommission : {
        fontWeight: 800,
        fontSize: '12px',
        lineHeight: '17px',
        marginLeft: '10px',
        textAlign: 'center'
    },
    commissionValueText: {
        fontWeight: 600,
        fontSize: '10px',
        lineHeight: '14px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        opacity: '0.5',
        margin: '2px',
    }

});


class ViewLaunchOnHover extends React.Component {

    render() {
        const {classes} = this.props;
        return (
            <Grid container>

                <Grid item md={12} className={classes.card}>

                    <Card className={classes.listCard} key={this.props.row._id}>

                        <CardContent classNmae={classes.listCardContent}
                                     style={{padding: '0px', margin: '10px'}}>
                            <Grid container>
                                <Grid item xs={1} style={{}}>
                                    <Avatar alt='Remy Sharp' variant="rounded"

                                            src={'/images/products/' + this.props.row.encodedAvatarUrl + ".jpg"}
                                            style={{width: '45px', height: '45px'}}/>

                                    <Typography variant='body2' className={classes.cardDate}>
                                        {moment(this.props.row.productLaunchDate).format('D MMM')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} md={6} lg={7} className={classes.centerPartCard}>
                                    <Box align={'left'} className={classes.listCardTitle}><Typography variant="h6"
                                    >
                                        {this.props.row.productName}
                                        <Typography variant='caption' color='textSecondary'
                                                    className={classes.listCardSubTitle}>&nbsp; &nbsp;  by {this.props.row.ownerName} : {this.props.row.productNetwork}
                                        </Typography>
                                    </Typography></Box>
                                    <Typography variant='body2' className={classes.listCardLorem}>
                                        {this.props.row.productDescription}
                                    </Typography>
                                    <Typography variant='body2' color='textSecondary' align={'left'}
                                                className={classes.listCardFooter}>Singapore
                                        | {this.props.row.productCategory}</Typography>
                                </Grid>
                                <Grid item xs={0} sm={0} md={0} lg={1}></Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Box className={classes.listCardLeft}>
                                        <Grid container>
                                            <Grid item xs={6} md={12}>

                                                <Typography className={classes.textProductCommission} variant=''>
                                                {this.props.row.productCommission}% of ${this.props.row.productPrice}
                                            </Typography>

                                                <Typography  variant='' className={classes.commissionValueText}>
                                                    Commission Value
                                                </Typography>
                                            </Grid>
                                            {/* href={`${this.props.row.jvPageLink}`}*/}

                                            <Grid item xs={6} md={12}>

                                                <Button href={'http://' + this.props.row.jvPageLink} target='_blank'
                                                        className={classes.promoteButton}>Promote</Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>

                        </CardContent>
                    </Card>


                </Grid>


            </Grid>
        );
    }

}

export default withStyles(useStyles)(ViewLaunchOnHover);
