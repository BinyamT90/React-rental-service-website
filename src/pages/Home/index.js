import React, {useEffect, useState} from 'react';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid, makeStyles,
    Typography, useMediaQuery, useTheme,
    withStyles
} from '@material-ui/core';
import backEndApi from "../../services/api";
import Filter from './Filter'
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Collapse from "@material-ui/core/Collapse/Collapse";
import {useHistory} from 'react-router-dom';
import {load} from "dotenv";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            margin:0,
        },

    },
    contentRoot: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            margin: '10px 0',
        }
    },
    FilterSearchHolder:{
        display:'flex',
        justifyContent:'center',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            margin: 0,
        }
    },
    lowerContainer: {
        display:'flex',
        gap:10,
        [theme.breakpoints.down('sm')]: {
            padding: 0,
            margin: 0,
        }
    },
    media: {
        paddingTop: '56.25%',
    },
    card: {},

    searchBarHolder: {
        position: 'relative',
        width: '70%',
        padding: 0,
        margin: 0,
        paddingBottom: '20px',

        "&:focus-within": {
            transform: "scale(1.025)",

        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: 0,
            margin: 0

        }
    },
    searchBar: {
        border: '0.2px solid #b5afaf',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        fontSize: '20px',
        borderRadius: '50px',
        paddingLeft: '50px',
        height: '50px',
        outline: 'none',
        "&:hover": {
            boxShadow: "1px 1px 1em #c4c4c4",
            outline: 'none',

        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',

        }
    },

    expand: {
        color:'#005CC8',
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    showButton: {
        border: 0, background: 'none', paddingTop: '6px'
    },
    showFilter:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding:'10px',
        color:'#005CC8',
        cursor:'pointer',
    },
}));

function MainBody(props) {
    const local = 'http://localhost:5000';
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();

    const isMobile = useMediaQuery( theme.breakpoints.down("sm"));
    const [showFilter, setShowFilter] = React.useState(false);

    const [houseDocs, setHouseDocs] = useState([]);
    const [keyword, setkeyword] = useState('');

    const [payment, setPayment] = useState([]);
    const [bedroom, setBedRooms] = useState([]);
    const [location, setLocation] = useState([]);
    const [guestHouse, setGuestHouse] = useState(false);

    useEffect(()=>{
        let q = new URLSearchParams(props.history.location.search).get('q');
        setkeyword(q);
    },[]);

    useEffect(()=>{
        history.push({
            pathname: '/search',
            search: `?${keyword?'q':''}=${keyword}&${payment.length!==0?'payment':''}=${payment}&${bedroom.length!==0?'bedrooms':''}=${bedroom}&${location.length!==0?'locations':''}=${location}&${guestHouse?'Gh':''}=${guestHouse}`
        });
        const loadData = async () =>{
            const {data} = await backEndApi.get('./search', {params: {q: keyword, location:location, bedroom:bedroom, payment:payment,guestHouse:guestHouse }});
            setHouseDocs(data)
        };
        loadData()
    },[payment, location, bedroom, guestHouse]);

    const onShowFilterClicked = () => {
        setShowFilter(!showFilter);
    };

    const bedrooms = (bedroom) =>{
        /*history.push(`/search?payment=${pay}&location=${locas}&bedrooms=${rooms}`);*/
        setBedRooms(bedroom)
    };
    const payments = (payment) =>{
        setPayment(payment)
    };

    const locations = (location) =>{
        setLocation(location)
    };
    const guestHouses = (guest) =>{
        setGuestHouse(guest)
    };
    const onInputChange = (e) => {
        e.preventDefault();
        setkeyword(e.target.value)
    };
    const onFormSubmit = async (e) => {
        e.preventDefault();
        const {data} = await backEndApi.get('./search', {params: {q: keyword, location:location, bedrooms:bedroom, payment:payment, guestHouse:guestHouse }});
        setHouseDocs(data)
        props.history.push(`?${keyword?'q':''}=${keyword}&${payment.length!==0?'payment':''}=${payment}&${bedroom.length!==0?'bedrooms':''}=${bedroom}&${location.length!==0?'locations':''}=${location}&${guestHouse?'Gh':''}=${guestHouse}`)

    };

    return (
        <Container maxWidth={'xl'} className={classes.root}>
            <Container maxWidth={'md'} className={classes.FilterSearchHolder}>
                <form className={classes.searchBarHolder} onSubmit={onFormSubmit}>
                    <input type="text" value={keyword} placeholder="Ayat Condominium"
                           className={classes.searchBar} onChange={onInputChange}/>
                    <i className="fas fa-search fa-lg"
                       style={{position: 'absolute', left: 15, top: 19, opacity: '0.4'}}></i>
                </form>
                {isMobile? <div>
                    <div className={classes.showFilter} onClick={onShowFilterClicked}>
                        <span>Filter</span>
                    </div>

                </div>:''
                }
            </Container>
            {isMobile?<Collapse in={showFilter} timeout="auto" unmountOnExit>
                <Filter setLocation={locations} setPayment={payments} setBedrooms = {bedrooms} setGuestHouses={guestHouses} />
            </Collapse>:''}
            <Container maxWidth={'xl'} className={classes.lowerContainer}>
                {isMobile?'':<Filter setLocation={locations} setPayment={payments} setBedrooms = {bedrooms} setGuestHouses={guestHouses}/>}
                <Container maxWidth='lg' className={classes.contentRoot} >
                    <Grid container spacing={2}>
                        {houseDocs ? houseDocs.map((home) => (
                            <Grid item key={home._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Card className={classes.contentRoot}>
                                    <CardActionArea href={`/detail/${home._doc._id}`}>
                                        <CardMedia
                                            className={classes.media}
                                            image={`${local}/images/products/${home._doc.ownerEmail}/${home._doc._id}/${home.Img}`}
                                            title="Contemplative Reptile"
                                        />
                                        <CardContent style={{paddingBottom: 0, height:'100px'}}>
                                            <Typography gutterBottom variant="body1" component="h2">
                                                {home._doc.location}
                                            </Typography>

                                            <Typography variant='body2' color='textSecondary'>Bed Room: <Typography
                                                variant='p'
                                                color='textPrimary'>{home._doc.bed_room}</Typography></Typography>
                                            <Typography variant='body2' color='textSecondary'>Monthly
                                                Rent: <Typography
                                                    variant='p'
                                                    color='textPrimary'>{home._doc.monthly_payment} birr</Typography></Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        width: '100%',
                                        paddingTop: 0,
                                        paddingRight: 30
                                    }}>
                                        <Button href={`/detail/${home._doc._id}`} size="small" color="primary">
                                            View
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>

                        )) : ''}

                    </Grid>
                </Container>
            </Container>
        </Container>
    );
}

export default MainBody;


