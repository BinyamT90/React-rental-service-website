import {Typography, withStyles,} from "@material-ui/core";
import React, {Component} from "react";
import FeedBack from "./FeedBack";
import Avatar from "@material-ui/core/Avatar";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ContactCard from "./ContactCard";
import Link from "@material-ui/core/Link";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import TelegramIcon from "@material-ui/icons/Telegram";
const useStyles = (theme) => ({
    root: {
        width: 'auto',
        display: "grid",
        margin: "2em",
        gridTemplateColumns: "3fr 2fr",
        gridColumnGap: "70px",
    },

    paragraphStyling: {
        padding: '0 3%',
        lineHeight: '1.5',
        textTransform: "full-width",
        fontSize: '20px',
        textIndent: '50px',
        textAlign: 'justify',
        letterSpacing: '2px',
    },


    Developers: {
        display: "flex",
        margin: "3em",
        gridTemplateColumns: "13fr 13fr",
        gridColumnGap: "280px",
    },
    large: {
        width: '100px',
        height: "100px",
    },
    developer: {
        marginLeft: "-10px",
        marginRight: '-10px'
    },
    footer1:{
        display:'flex',
        flexDirection:'row',
        marginTop:'40px',
        width:'100%',

    },

    contactInfo:{
        marginTop:'-30px',
        maxWidth: '60%',
        padding: '60px'
    }
    ,

    card1:{
        marginTop:'16px',
        marginRight:'30px',
        marginLeft:'40px',
        maxWidth:'50%'
    },

    contact:{
        marginTop:'20px',
        marginBottom:'30px'
    }

});

class About extends Component {
    onSubmit = (email, feedback) => {
        console.log(email, feedback);
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Card className={classes.root}>
                    <div>
                        <div
                            className="aboutContent"
                            style={{textAlign: "center", margin: "2em "}}>
                            <Typography variant="h4">Agenagn</Typography>

                                <Typography>
                                    <p className={classes.paragraphStyling}>
                                        Agenagn is a solution for looking for house available for rent.
                                        The system connects strangers who looking for house rent and
                                        administrator of the system. The service capable of showing the
                                        detailed information about the house such as number of bedrooms,
                                        bathrooms, price of rent, location where the house is found. In
                                        addition, the strangers can filter the available house with
                                        respect to the ranges of price they can afford. The service would
                                        not provide online payment since online payment is another
                                        challenge in Ethiopia. The system reduces strangers’ time, energy
                                        and money spent by looking for house. It reduces an additional
                                        money spent for brokers from both strangers and owner.
                                        Furthermore, it facilitates house rent to be taken earlier. In
                                        terms of boundary Agenagn works for house found around Addis Ababa
                                        for now. But, for sure Agenagn will expand to the rest of
                                        Ethiopia.
                                    </p>
                                </Typography>

                        </div>
                    </div>
                    <div className="feedback">
                        <FeedBack onSubmit={this.onSubmit}/>
                    </div>
                </Card>
                <Card><div className={classes.footer1}>
                    <div className={classes.card1}>
                        <ContactCard></ContactCard>
                    </div>
                    <div className={classes.contactInfo}>

                                Contact Information
                                <Card>
                                    <CardContent>
                                        Company: Agenagn Trading P.L;C Address: Firdu
                                        Commercial Building, 3rd Floor Office no 308. P.O.box:
                                        54178 Tel: 1 +251-989 830607 Tel: 2 +251-974 082037
                                    </CardContent>
                                </Card>
                                <Card className={classes.contact}>
                                    <CardContent>
                                        Email:
                                        <Link
                                            component="button"
                                            variant="body2"
                                            onClick={() => {
                                                console.info("I'm a button.");
                                            }}
                                        >
                                            huruynegash89@gmail.com
                                        </Link>
                                        <Link
                                            component="button"
                                            variant="body2"
                                            onClick={() => {
                                                console.info("I'm a button.");
                                            }}
                                        >
                                            huruynegash89@gmail.com
                                        </Link>
                                        <Typography>What’s up No: +251 989830607</Typography>
                                        <Link
                                            component="button"
                                            variant="body2"
                                            onClick={() => {
                                                console.info("I'm a button.");
                                            }}
                                        >
                                           huruynegash89@gmail.com
                                        </Link>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent>
                                        <Typography>Follow us on: </Typography>

                                        <FacebookIcon color="primary"></FacebookIcon>

                                        <TelegramIcon color="primary"></TelegramIcon>


                                        <LinkedInIcon color="primary"></LinkedInIcon>

                                        <TwitterIcon color="primary"></TwitterIcon>


                                        <InstagramIcon color="primary"></InstagramIcon>

                                    </CardContent>
                                </Card>

                    </div>
                </div>
                </Card>

        </div>
        );
    }
}

export default withStyles(useStyles, {withTheme: true})(About);
