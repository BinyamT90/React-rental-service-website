import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
    root: {
        width:'auto'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },

    titile:{
        color:'red'
    }
}));

export default function ContactCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.root}>
            <div className={classes.titile}
                title="Agenagn!"
                subheader="Agenagn is a solution for looking for house available for rent.!                                                             "
            />
            <CardContent>
                <Typography paragraph>
                    The system connects strangers who looking for house rent and
                    administrator of the system. The service capable of showing the
                    detailed information about the house such as number of bedrooms,
                    bathrooms, price of rent, location where the house is found.
                </Typography>

                <Typography >
                    In addition, the strangers can filter the available house with
                    respect to the ranges of price they can afford.
                </Typography>
                <Typography>
                    The service would
                    not provide online payment since online payment is another
                    challenge in Ethiopia. The system reduces strangers’ time, energy
                    and money spent by looking for house. It reduces an additional
                    money spent for brokers from both strangers and owner.
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography>
                        money spent for brokers from both strangers and owner.
                        Furthermore, it facilitates house rent to be taken earlier. In
                        terms of boundary Agenagn works for house found around Addis Ababa
                        for now. But, for sure Agenagn will expand to the rest of
                        Ethiopia.
                    </Typography>
                </CardContent>
            </Collapse>
        </div>
    );
}
