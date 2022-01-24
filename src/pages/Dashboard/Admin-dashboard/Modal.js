import React from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Grid,
    IconButton,
    makeStyles,
    Typography
} from '@material-ui/core';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import backEndApi from '../../../services/api'

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding:'20px 20px 20px 25px',
        position: 'absolute',
        outline: 'none',
        borderRadius:'5px',
        backgroundColor: theme.palette.background.paper,
        /*padding: theme.spacing(2, 1, 3, 4),*/
        border: '0px solid #eee !important',
        overflow: 'hidden'
    },
    margin: {
        margin: '5px',
        fontSize: '15px',
        borderRadius: '4px',
        "&:hover": {backgroundColor: '#3A6351'},
    },
    closeIcon: {
        margin: '5px',
        marginRight: '-10px',
        marginTop: '-2px',
        fontSize: '15px',
        borderRadius: '4px',
        "&:hover": {backgroundColor: 'rgba(223,45,76,0.7)'},
    },
    iconBackgroundBlack: {
        backgroundColor: 'rgba(57,50,50,0.2)'
    },
    gridHolder: {
        marginBottom: '15px'
    },


    grid: {
        marginTop: '15px',
        boxSizing: 'border-box',
        filter: 'drop-shadow(-9px 18px 16px rgba(0, 0, 0, 0.05))',
        borderRadius: '5px',
        width: '750px',
        height: '120px'
    },
    gridTextarea: {
        marginBottom: '20px',
        border: '0px solid #393232',

        borderRadius: '5px',

    },

    listCard: {
        margin: '8px 10px',

        height: '100px',
        backgroundColor: 'rgba(228, 130,87, 0.2)',

        border: '0.5px solid rgba(228, 130, 87, 0.6)',
        boxSizing: 'border-box',
        borderRadius: '5px',
        overflow: 'hidden',

    },
    textarea: {
        resize: 'none',
        width: '750px',
        height: '90px',
        border: '0.3px solid #333',
    },
    rejectApproveButton: {
        marginRight: '15px',
        marginTop: '15px',
    },
    approveButton: {
        background: '#393232',
        borderRadius: '5px',
        color: '#F2EDD7',
        paddingLeft: '50px',
        paddingRight: '50px',
        marginLeft: '20px',
        marginRight: '-15px',
        "&:hover": {
            background: '#7c6d6d',
        }
    },
    rejectButton: {
        border: '1px solid #E48257',
        borderRadius: '5px',
        color: '#E48257',
        paddingLeft: '40px',
        paddingRight: '40px'
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

    },

    smallText: {
        fontSize: '10px',
        lineHeight: '14px'
    },

    listCardSubTitle: {
        opacity: '0.5',
        display: 'inline',
        marginLeft: '10px'
    },

    listCardLorem: {
        color: '#393232',
        fontWeight: 'normal',
        fontSize: '10px',
        lineHeight: '14px',
        maxHeight: '30px',
        overflow: 'hidden'
    },

    listCardLeft: {
        backgroundColor: 'rgba(57,50,50,0.05)',
        margin: '-5px 0px 0px 0px',
        padding: '10px 10px 10px 25px',
        borderRadius: '5px',
    },

    listCardFooter: {
        marginTop: '10px',
        opacity: '0.5',

    },

    centerPartCard: {
        overflow: 'hidden'

    },


}));

export default function SimpleModal(props) {
    let noteToVendor = '';
    const onNoteToVendorChanged = (e)=>{
        noteToVendor = e.target.value;
        console.log(noteToVendor)
    };
    const onButtonClick = async (value, id) => {
        const buttonSelected =()=> {
            if (props.docs.reviewStatus === "Approved") {
                return "Approved" // preventing admin altering the Approved item.
            }
            return value;
        };
        const buttonClicked = {
            id: id,
            selectedButton: buttonSelected(),
            noteToVendor:noteToVendor,
        };
        const response = await backEndApi.post('/changeHomeStatus', {params: buttonClicked});

        handleClose();

        props.reRender(true);

    };
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    /*const highwayHut = process.env.PUBLIC_URL + '/img/highwayHut.png';*/
    /*const highwayHut = 'http://localhost:5000/images/products/' + props.docs.encodedAvatarUrl + ".jpg";*/
    const highwayHut = 'https://damp-fjord-23317.herokuapp.com/images/products/' + props.docs.encodedAvatarUrl + ".jpg";
    /*const fetchImageAPiRequest =  (id) => {

        /!*return await backEndApi.get('/getAvatar', {params: id});*!/



    };*/

    const handleClose = () => {
        handleOpen();
        setOpen(false);
    };
    /*@chinnyuee You can see my progress on the Admin Page.
for now the admin account detail is
Email =  Justt@gmail.com
password = qw
*/
    const body = (
        <div style={modalStyle} className={classes.paper}>

            <Grid container style={{marginBottom: '-20px', marginTop: '-10px'}}>
                <Grid item md={12} align='right'>
                    <IconButton onClick={handleClose} className={[classes.closeIcon]}
                                size='small'>
                        <HighlightOffIcon fontSize='small'/>

                    </IconButton>

                </Grid>
            </Grid>
            <Typography variant='h6' align='center' id="simple-modal-title"
                        style={{fontWeight: '800px'}}>Listing
                Review</Typography>
            <div className={classes.gridHolder}>
                <Grid container className={classes.grid} justify='center'>
                    <Grid item md={10}>
                        <Card className={classes.listCard}>

                            <CardContent classNmae={classes.listCardContent}
                                         style={{padding: '0px', margin: '10px'}}>
                                <Grid container>
                                    <Grid item xs={1}>
                                        <Avatar alt='Remy Sharp' variant="rounded"
                                                src={highwayHut}
                                                style={{width: '45px', height: '45px'}}/>
                                        <Typography variant='body2' className={classes.cardDate}>
                                            {moment(props.docs.productLaunchDate).format("D MMM")}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={7} md={6} lg={7} className={classes.centerPartCard}
                                          style={{paddingLeft: '10px'}}>
                                        <Box className={classes.listCardTitle}><Typography variant="h6"
                                        >
                                            {props.docs.productName}
                                            <Typography variant='caption' color='textSecondary'
                                                        className={classes.listCardSubTitle}>
                                                by {props.docs.ownerName} : Highway
                                            </Typography>
                                        </Typography>
                                        </Box>
                                        <Typography variant='body2' className={classes.listCardLorem}>
                                            {props.docs.noteToReviewer}


                                        </Typography>
                                        <Typography variant='body2' color='textSecondary'
                                                    className={classes.listCardFooter}>Singapore
                                            | {props.docs.productNetwork}</Typography>
                                    </Grid>
                                    <Grid item xs={1} sm={0} md={0} lg={1}></Grid>
                                    <Grid item xs={3} md={4} lg={3}>
                                        <Box className={classes.listCardLeft}>
                                            <Typography variant='' style={{
                                                fontWeight: 800,
                                                fontSize: '12px',
                                                lineHeight: '17px',
                                                marginLeft: '10px',
                                                textAlign: 'center'
                                            }}>{props.docs.productCommission}% of
                                                ${props.docs.productPrice}</Typography>
                                            <Typography variant='' style={{
                                                fontWeight: 600,
                                                fontSize: '10px',
                                                lineHeight: '14px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                textAlign: 'center',
                                                opacity: '0.5',
                                                margin: '2px',
                                            }}>Commission Value</Typography>
                                            <Button style={{
                                                color:'#fff',
                                                background: '#3A6351',
                                                borderRadius: '5px',
                                                marginLeft: '5px',
                                                width: '73px',
                                                height: '25px', textTransform: 'none',
                                            }}>Promote</Button>
                                        </Box>
                                    </Grid>
                                </Grid>

                            </CardContent>
                            <CardActions>

                            </CardActions>
                        </Card>

                    </Grid>
                </Grid></div>
            <div className={classes.gridHolder}>
                <Typography variant='body1' style={{margin: '5px'}}>Note to Reviewer</Typography>
                <Grid container className={classes.gridTextarea}>
                    <textarea disabled className={classes.textarea}>
                        {props.docs.noteToReviewer}
                    </textarea>
                </Grid>
            </div>
            <div className={classes.gridHolder}>
                <Typography variant='body1' bold style={{margin: '5px'}}> Note to Vendor</Typography>
                <Grid container className={classes.gridTextarea}>
                    <textarea className={classes.textarea} onChange={onNoteToVendorChanged}></textarea>

                </Grid>
            </div>
            <div>
                <Grid container>
                    <Grid item md={12} align='right' className={classes.rejectApproveButton}>
                        <Button variant='outlined' className={classes.rejectButton}
                                onClick={() => onButtonClick("Rejected", props.docs._id)}>
                            Reject
                        </Button>
                        <Button variant='contained' className={classes.approveButton}
                                onClick={() => onButtonClick("Approved", props.docs._id)}>
                            Approve
                        </Button>
                    </Grid>

                </Grid>
            </div>

        </div>
    );

    return (
        <div>
            {/*<button type="button" onClick={handleOpen}>
                Open Modal
            </button>*/}
            <IconButton onClick={handleOpen} className={[classes.margin, classes.iconBackgroundBlack]}
                        size='small'>
                <VisibilityIcon fontSize='inherit'/>
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}
