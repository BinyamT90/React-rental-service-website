// imports the React Javascript Library
import React from "react";
//Card
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
// Search
//Tabs
import {withStyles} from "@material-ui/core/styles";
import backEndApi from "../../services/api";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },

});

class EditHose extends React.Component {
    state = {

        originalHouseId: '',
        ownerEmail: '',
        location: '',
        description: '',
        squareMeter: '',
        bedRoom: '',
        monthlyPayment: '',
        floor: '',
        phoneNumber: '',
        guestHouse: '',

        availabilityDate: '',
        editedEncodedAvatarUrl: '',
        listingStatus: '',
        reviewStatus: '',

        errorMessage: '',
        file: `https://images.pexels.com/photos/1909603/pexels-photo-1909603.jpeg`,

        isRedirectToHomepage: false,
        submitValue: '',

    };

    componentDidMount = async () => {
        const {data} = await backEndApi.get('./edithouse', {params: {id: props.match.params.id}});
        console.log(data);
        const imagesImage = () => {
            const files = data.files;
            const what = `http://localhost:5000/images/products/${data.docs.ownerEmail}/${data.docs._id}/`;
            files.forEach((file) => {
                otherArray.push(what + file)
            })
            return otherArray
        };

        const firstImg = `http://localhost:5000/images/products/${data.docs.ownerEmail}/${data.docs._id}/${data.files[0]}`
        setState({
            originalHouseId: data.docs._id,
            ownerEmail: data.docs.ownerEmail,
            location: data.docs.location,
            squareMeter: data.docs.squareMeter,
            bedRoom: parseInt(data.docs.bed_room),
            monthlyPayment: parseInt(data.docs.monthly_payment),
            floor: parseInt(data.docs.floor),
            phoneNumber: parseInt(data.docs.phone_number),
            guestHouse: data.docs.guest_house ? 'yes' : 'no',
            description: data.docs.description,
            availabilityDate: data.docs.availabilityDate,
            listingStatus: data.docs.listingStatus,
            reviewStatus: data.docs.reviewStatus,

            editedEncodedAvatarUrl: data.docs.encodedAvatarUrl,
            file: imagesImage(),
            /*file:[...file, firstImg],*/

        });

    };


}

class ImageUploadCard extends React.Component {
    state = {
        mainState: "initial", // initial, search, gallery, uploaded
        imageUploaded: 0,
        selectedFile: []
    };

    handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            this.setState({
                selectedFile: [reader.result]

            });

        }.bind(this);
        console.log(event.target.files);
        this.setState({
            mainState: "uploaded",
            selectedFile: event.target.files,
            imageUploaded: 3
        });
    };


    renderInitialState() {
        const {classes, theme} = this.props;
        const {value} = this.state;

        return (
            <React.Fragment>
                <CardContent>
                    <Grid container justify="center" alignItems="center">
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon/>
                            </Fab>
                        </label>

                    </Grid>
                </CardContent>
            </React.Fragment>
        );
    }


    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Card className={this.props.cardName}>
                        {this.renderInitialState()}


                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

class EditHose extends React.Component {
    state = {

        originalHouseId: '',
        ownerEmail: '',
        location: '',
        description: '',
        squareMeter: '',
        bedRoom: '',
        monthlyPayment: '',
        floor: '',
        phoneNumber: '',
        guestHouse: '',

        availabilityDate: '',
        editedEncodedAvatarUrl: '',
        listingStatus: '',
        reviewStatus: '',

        errorMessage: '',
        file: `https://images.pexels.com/photos/1909603/pexels-photo-1909603.jpeg`,

        isRedirectToHomepage: false,
        submitValue: '',

    };

    componentDidMount = async () => {
        const {data} = await backEndApi.get('./edithouse', {params: {id: props.match.params.id}});
        console.log(data);
        const imagesImage = () => {
            const files = data.files;
            const what = `http://localhost:5000/images/products/${data.docs.ownerEmail}/${data.docs._id}/`;
            files.forEach((file) => {
                otherArray.push(what + file)
            })
            return otherArray
        };

        const firstImg = `http://localhost:5000/images/products/${data.docs.ownerEmail}/${data.docs._id}/${data.files[0]}`
        setState({
            originalHouseId: data.docs._id,
            ownerEmail: data.docs.ownerEmail,
            location: data.docs.location,
            squareMeter: data.docs.squareMeter,
            bedRoom: parseInt(data.docs.bed_room),
            monthlyPayment: parseInt(data.docs.monthly_payment),
            floor: parseInt(data.docs.floor),
            phoneNumber: parseInt(data.docs.phone_number),
            guestHouse: data.docs.guest_house ? 'yes' : 'no',
            description: data.docs.description,
            availabilityDate: data.docs.availabilityDate,
            listingStatus: data.docs.listingStatus,
            reviewStatus: data.docs.reviewStatus,

            editedEncodedAvatarUrl: data.docs.encodedAvatarUrl,
            file: imagesImage(),
            /*file:[...file, firstImg],*/

        });

    };


}

export default withStyles(styles, {withTheme: true})(ImageUploadCard);
