import React from 'react';
import {Button, Grid, Typography} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import {Redirect} from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backEndApi from '../../services/api'
import moment from "moment";
import {withStyles} from "@material-ui/styles";
import Container from "@material-ui/core/Container";

const useStyles = theme => ({
    root: {
        marginTop: '20px',
        marginLeft: '16px',
        "& input[type=number]": {
            "&::-webkit-inner-spin-button": {
                '-webkit-appearance': 'none',
            },
            "&::-webkit-outer-spin-button": {
                '-webkit-appearance': 'none',
            },
            '-moz-appearance': 'textField'
        },
        "& .MuiTypography-body2": {
            fontWeight: 800
        },
        "& form":{
            padding:'40px',

            /*[theme.breakpoints.down('sm')]:{
                padding:'0'
            }*/
        },
        "@media (max-width:600px)":{
            "& form":{
                padding:'0px',
            }
        },
    },
    firstGrid: {
        background: '#EEEEEE',
        boxShadow: '-9px 18px 16px rgba(0, 0, 0, 0.05)',
        borderRadius: '5px',
    },

    input: {
        padding: '10px',
        marginTop: '5px',
        width: '100%',
        height: '40px',
        borderRadius: '5px',
        border: '0.5px solid #9e9e9e',
        background: '#EEEEEE',
        "&::-webkit-input-placeholder": {
            color: 'rgba(57,50,50,0.3)'
        },

        "&::-moz-placeholder": { /* Firefox 19+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-ms-input-placeholder": { /* IE 10+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-moz-placeholder": { /* Firefox 18- */
            color: 'rgba(57,50,50,0.3)'

        },

    },
    dataPicker: {
        "& .react-datepicker-wrapper": {
            display: 'block',
        },
        "& input": {},


    },
    textarea: {
        padding: '10px',
        resize: 'none',
        width: '100%',
        background: '#EEEEEE',
        border: '0.5px solid #9e9e9e',
        borderRadius: '5px',
        height: '120px',
        "&::-webkit-input-placeholder": {
            color: 'rgba(57,50,50,0.3)'
        },

        "&::-moz-placeholder": { /* Firefox 19+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-ms-input-placeholder": { /* IE 10+ */
            color: 'rgba(57,50,50,0.3)'

        },
        "&:-moz-placeholder": { /* Firefox 18- */
            color: 'rgba(57,50,50,0.3)'

        },
    },
    inputsContainer: {
        margin: '15px'
    },
    dropZone: {
        "& .MuiDropzoneArea-root": {
            background: '#EEEEEE',
            marginBottom: '30px',
            maxHeight: '343',

            border: '.5px solid #9e9e9e',

        },
        /*"& .MuiTypography-h5": {
            fontSize: '14px',
            fontWeight: 'normal'
        },
        "& .MuiDropzoneArea-text": {
            marginTop: '130px',
            color: '#9e9e9e'
        },
        "& .MuiSvgIcon-root": {
            display: 'flex',
            marginTop: '-100px',
            marginLeft: '110px',
            color: "#9e9e9e"
        }*/
    },
    inputError: {
        color: 'red',
        fontSize: '14px',
        display: 'none',
    },
});

class NewListing extends React.Component {
    state = {

        location: '',
        bedRoom: '',
        monthlyPayment: '',
        floor: '',
        phoneNumber: '',
        guestHouse: false,
        description: '',
        squareMeter: '',

        file: null,
        errorMessage: '',
        isRedirectToHomepage: false,

    };

    onFormSubmit = (e) => {
        e.preventDefault();

        this.validateForm(e);
    };
    listingStatusFilter = (e) => {
        if (e.currentTarget.value === "Pending") {
            return "Submitted"
        } else {
            return "Draft"
        }

    };
    validateForm = (e) => {

        const product = {

            location: this.state.location,
            bedRoom: parseInt(this.state.bedRoom),
            monthlyPayment: parseInt(this.state.monthlyPayment),
            floor: parseInt(this.state.floor),
            squareMeter: this.state.squareMeter,
            phoneNumber: parseInt(this.state.phoneNumber),
            guestHouse: this.state.guestHouse,
            description: this.state.description,

            listingStatus: this.listingStatusFilter(e),
            reviewStatus: e.currentTarget.value
        };
        console.log('come 1 ');
        if (!this.state.location) {
            document.getElementById('locationError').style.display = 'block';
        }
        if (!this.state.floor) {
            document.getElementById('floorError').style.display = 'block';

        }
        if (!this.state.monthlyPayment) {
            document.getElementById('monthlyPaymentError').style.display = 'block';

        }
        if (!this.state.bedRoom) {
            document.getElementById('bedRoomError').style.display = 'block';

        }
        /*if (!this.state.guestHouse) {
            document.getElementById('guestHouseError').style.display = 'block';

        }*/
        if (!this.state.phoneNumber) {
            document.getElementById('availabilityError').style.display = 'block';

        }

        if (!this.state.file) {
            document.getElementById('dropZoneImage').style.display = 'block';
        }
        console.log('come 2 ');

        if (this.state.location &&
            this.state.floor && this.state.monthlyPayment
            && this.state.bedRoom
            && this.state.phoneNumber && this.state.file) {

            console.log('come 3 ');

            this.submitNewListingApiRequest(product);


        } else {
            //for not yet validated
            console.log('come 4 ');

        }


    };

    submitNewListingApiRequest = async (newLaunchDetails) => {
        /*let user = this.props.getToken();*/

        const formData = new FormData();
        this.state.file.forEach(fil => formData.append('files[]', fil));
        /*formData.append('files[]', this.state.file);*/
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        console.log(newLaunchDetails, 'what');
        let response = await backEndApi.post('/addhouse', {params: newLaunchDetails});
        let resImage = await backEndApi.post('/uploadHouseImage', formData, config);

        console.log("The files and Image success fully uploaded" + resImage + response);
        this.setState({isRedirectToHomepage: true,})

    };


    onLocationChanged = (e) => {
        if (e.target.value.length === 0) {
            document.getElementById('locationError').style.display = 'block';
        } else {
            document.getElementById('locationError').style.display = 'none';

        }
        this.setState({location: e.target.value});
        if (e.target.value !== 1) {
            this.setState({location: e.target.value})
        }
    };

    onDescriptionChanged = (e) => {

        this.setState({description: e.target.value})
    };
    onFloorchanged = (e) => {
        if (e.target.value === 'Select Floor') {
            document.getElementById('floorError').style.display = 'block';

        } else {
            document.getElementById('floorError').style.display = 'none';
        }
        this.setState({floor: e.target.value})
    };
    onMonthlyPaymentChanged = (e) => {
        if (e.target.value.length === 0) {
            document.getElementById('monthlyPaymentError').style.display = 'block';
        } else {
            document.getElementById('monthlyPaymentError').style.display = 'none';
        }

        this.setState({monthlyPayment: e.target.value})
    };
    onBedroomChanged = (e) => {
        if (e.target.value.length === 'Select Bed Rooms') {
            document.getElementById('bedRoomError').style.display = 'block';

        } else {
            document.getElementById('bedRoomError').style.display = 'none';

        }
        this.setState({bedRoom: e.target.value})
    };
    onPhoneNumberChanged = (e) => {

        if (e.target.value.length === 0) {
            document.getElementById('phoneNumberError').style.display = 'block';

        } else {
            document.getElementById('phoneNumberError').style.display = 'none';

        }


        this.setState({phoneNumber: e.target.value})


    };
    onAvailabilityChanged = (date) => {

        if (date === null) {
            document.getElementById('availabilityError').style.display = 'block';

        } else {
            document.getElementById('availabilityError').style.display = 'none';

        }

        this.setState({availabilityDate: date})
    };
    onSquareMeterChanged = (e) => {

        this.setState({squareMeter: e.target.value})
    };
    onDropZoneChange = (e) => {
        if (e[0]) {
            document.getElementById('dropZoneImage').style.display = 'none';

        }

        this.setState({file: e});

    };
    onGuestHouseChanged = (e) => {

        /*if (e.target.value.length === 0) {
            document.getElementById('guestHouseError').style.display = 'block';

        } else {
            document.getElementById('guestHouseError').style.display = 'none';

        }*/

        this.setState({guestHouse: e.target.value === 'yes'})
    };

    render() {
        const {classes} = this.props;

        if (!this.props.getToken()) {
            return <Redirect to='/login'/>
        }
        if (this.state.isRedirectToHomepage) {
            return <Redirect to='/dashboard'/>
        }
        return (
            <Container>
                <Container className={classes.root}>
                <Typography variant='h5' style={{marginBottom: '30px', marginTop: '35px', marginLeft: '-15px'}}>New
                    House</Typography>

                <Grid container className={classes.firstGrid} spacing={4}>
                    <Grid item xs={12} md={6}>
                        <form>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Location of the Condominium</Typography>
                                <input type="text" list='locationOfCondominium' id="location" name='Myname'
                                       placeholder='Location of the condominium'
                                       className={classes.input}
                                       onChange={this.onLocationChanged}
                                       value={this.state.location}
                                />
                                <datalist id="locationOfCondominium">
                                    <option value="Ayat Condominium"/>
                                    <option value="Yeka Abado Condominium"/>
                                    <option value="Submit Condominium"/>
                                    <option value="Gelan Condominium"/>
                                    <option value="Tuludimtu Condominium"/>
                                    <option value="4 killo Condominium"/>
                                    <option value="Gotera Condominium"/>
                                    <option value="Balderas Condominium"/>
                                    <option value="Mebrathail Condominium"/>
                                </datalist>

                                <Typography variant='body2' id='locationError' className={classes.inputError}>You have
                                    to entered Location of your condominium.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Bed Rooms</Typography>
                                <select className={classes.input} onChange={this.onBedroomChanged}
                                        name="selectNumberOfBedrooms">
                                    <option value="Select Bed Rooms" disabled selected>Select Bed Rooms
                                    </option>
                                    <option value='1'>0 (studio)</option>
                                    <option value='1'>1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>

                                <Typography type='number' variant='body2' id='bedRoomError'
                                            className={classes.inputError}>You have
                                    to enter number of bed rooms.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Floor</Typography>

                                <select name="selectNumberOfFloor" className={classes.input}
                                        onChange={this.onFloorchanged}>
                                    <option value="Select Floor" disabled selected>Select Floor
                                    </option>
                                    <option value='0'>ground</option>
                                    <option value='1'>+1</option>
                                    <option value="2">+2</option>
                                    <option value="3">+3</option>
                                    <option value="4">+4</option>
                                    <option value="5">+5</option>
                                    <option value="6">+6</option>

                                </select>
                                <Typography variant='body2' id='floorError' className={classes.inputError}>you have
                                    to
                                    select floor.</Typography>
                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Monthly Payment</Typography>
                                <input name="payment" type="number" min='0' placeholder='eg, 5000'
                                       className={[classes.input]}
                                       onChange={this.onMonthlyPaymentChanged}
                                       value={this.state.monthlyPayment}


                                />
                                <Typography variant='body2' id='monthlyPaymentError' className={classes.inputError}>you
                                    have to
                                    enter monthly payment.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>Square meters <span
                                    style={{opacity: '0.5'}}>(optional)</span></Typography>
                                <input name="SquareMeter" type="text" list='squareMetersInput'
                                       placeholder='Square meter of your house' className={classes.input}
                                       onChange={this.onSquareMeterChanged}
                                       value={this.state.editavailabilityDate}

                                />
                                <datalist id='squareMetersInput'>
                                    <option value="4 x 4"></option>
                                    <option value="3 x 4"></option>
                                    <option value="5 x 4"></option>
                                    <option value="5 x 3"></option>
                                </datalist>

                            </div>
                            <div className={[classes.inputsContainer]}>
                                <Typography variant='body2'>Available for rent starting from</Typography>
                                {/* <input type="text" placeholder='Enter product name' className={classes.input}
                                   onChange={this.onAvailabilityChanged}/>*/}
                                <div className={classes.dataPicker} id="date">
                                    <DatePicker
                                        name="date"
                                        dateFormat="dd-MM-yyyy"
                                        selected={this.state.productLaunchDate}
                                        className={[classes.input]}
                                        onChange={this.onAvailabilityChanged}
                                        value={moment(this.state.availabilityDate).format("DD-MM-YYYY")}
                                    />
                                </div>
                                <Typography variant='body2' id='availabilityError' className={classes.inputError}>You
                                    have
                                    to
                                    Set Launch Data.</Typography>

                            </div>
                            <div className={classes.inputsContainer}>
                                <Typography variant='body2'>phone number</Typography>
                                <div style={{position: 'relative'}}><input type="number" placeholder='eg, 925762589'
                                                                           name="phone" className={classes.input}
                                                                           onChange={this.onPhoneNumberChanged}
                                                                           value={this.state.phoneNumber}
                                                                           style={{paddingLeft: '50px'}}
                                />
                                    <span
                                        style={{position: 'absolute', left: 7, top: "35%", opacity: '0.5'}}>+251</span>
                                </div>

                                <Typography variant='body2' id='phoneNumberError' className={classes.inputError}>You
                                    have
                                    to enter your phone number.</Typography>

                            </div>

                        </form>
                    </Grid>
                    <Grid item xs={12} md={6}>

                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>Upload house image</Typography>

                            <Grid style={{marginTop: '5px'}}>
                                <Grid itme xs={12} md={8} className={classes.dropZone} id="upload" data-cy="content">

                                    {/*Icon ={}*/}
                                    <DropzoneArea
                                        acceptedFiles={['image/*']}
                                        maxFileSize={6000000}
                                        filesLimit={'6'}
                                        dropzoneText={"Drag and drop an image here or click"}
                                        onChange={this.onDropZoneChange}
                                    />
                                    {/*<DropzoneArea getPreviewIcon={this.handlePreviewIcon}
                                                  dropzoneText="Drag and drop a jpg, png or webp Icon, Or click to add"/>*/}
                                </Grid>
                                <Typography variant='body2' id='dropZoneImage' className={classes.inputError}>You have
                                    to
                                    upload an image.</Typography>
                            </Grid>
                        </div>
                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>is it Guest House</Typography>
                            <label htmlFor="guestYes">Yes</label>
                            <input type="radio" value='yes' id='guestYes' name='guestRadio'
                                   placeholder='is it Guest House'
                                   onChange={this.onGuestHouseChanged}

                            />
                            <label htmlFor="guestNo">No</label>

                            <input type="radio" value='no' id='guestNo' name='guestRadio'
                                   onChange={this.onGuestHouseChanged}
                            />
                            <Typography variant='body2' id='guestHouseError' className={classes.inputError}>You have
                                specific if it is guesthouse.</Typography>


                        </div>

                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>Short description <span
                                style={{opacity: '0.5'}}>(optional)</span></Typography>
                            <textarea name="shortDescription" className={classes.textarea}
                                      placeholder='Enter short description...'
                                      style={{marginTop: '5px',}} onChange={this.onDescriptionChanged}
                                      value={this.state.description}
                            />

                        </div>

                        <br/><br/><br/><br/>
                        <div style={{
                            display:'flex',
                            justifyContent:'flex-end',
                            gap:'5px',
                        }}>
                            <Button onClick={this.onFormSubmit} value='NA' variant='contained' style={{
                                paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                                borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                            }}>Save As Draft</Button>

                            <Button id="submit" onClick={this.onFormSubmit} value='Pending' variant='contained' style={{
                                paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                                borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                            }}> Submit For Review</Button>
                        </div>
                    </Grid>

                </Grid>

            </Container>
            </Container>
        );
    }

}

export default withStyles(useStyles)(NewListing);



