import React, {useEffect, useRef, useState} from 'react';
import {Button, Grid, Typography, withStyles} from '@material-ui/core';
import {DropzoneArea} from 'material-ui-dropzone';
import {Redirect} from "react-router-dom";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import backEndApi from '../../services/api';
import moment from "moment";
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
            [theme.breakpoints.down('sm')]:{
               padding:'0'
            }
        }
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
    /*dropZone: {
        "& .MuiDropzoneArea-root": {
            background: '#F2EDD7',
            marginBottom: '30px',
            maxHeight: '243',
            height: '210px',
            minHeight: '200px',
            border: '.5px solid rgba(228, 130, 87, 0.8)',

        },
        "& .MuiTypography-h5": {
            fontSize: '14px',
            fontWeight: 'normal'
        },
        "& .MuiDropzoneArea-text": {
            marginTop: '130px',
            color: '#005CC8'
        },
        "& .MuiSvgIcon-root": {
            display: 'flex',
            marginTop: '-100px',
            marginLeft: '110px',
            color: "#005CC8"
        }
    },*/
});
let otherArray = [];


function EditHouse(props) {

    let firstImg1 = `http://localhost:5000/images/products/kalabamare88@gmail.com/61360f78238d173368337a3e/1.jpg`;
    const {classes} = props;
    const firstImg2 = useRef([]);
    const [theDocs, setTheDocs] = useState('');
    const [originalHouseId, setOriginalHouseId] = useState('');
    const [ownerEmail, setOwnerEmail] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [squareMeter, setSquareMeter] = useState('');
    const [bedRoom, setBedRoom] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState('');
    const [floor, setFloor] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [guestHouse, setGuestHouse] = useState('');
    const [availabilityDate, setAvailabilityDate] = useState('');
    const [editedEncodedAvatarUrl, setEditedEncodedAvatarUrl] = useState('');
    const [listingStatus, setListingStatus] = useState('');
    const [reviewStatus, setReviewStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [file, setFile] = useState([]);
    const [isRedirectToHomepage, setIsRedirectToHomepage] = useState('');
    const [submitValue, setSubmitValue] = useState('');

    useEffect(() => {


        const loadData = async () => {

            const {data} = await backEndApi.get('./edithouse', {params: {id: props.match.params.id}});
            console.log(data);
            setTheDocs(data);
            const imagesImage = () => {
                const files = data.files;
                otherArray = [];
                files.forEach((the) => {
                    const what = `http://localhost:5000/images/products/${data.docs.ownerEmail}/${data.docs._id}/${the}`;
                    otherArray.push(what)
                });
                console.log(otherArray, 'what');
                return otherArray
            };

            /*firstImg2.current = `http://localhost:5000/images/products/${data.docs.ownerEmail}/${data.docs._id}/${data.files[0]}`;*/
            /*firstImg2.current = imagesImage();

            let newVar = setFile(imagesImage());*/
            console.log(imagesImage(), 'and what')
            // eslint-disable-next-line no-unused-expressions
            setOwnerEmail(data.docs.ownerEmail),
                setOriginalHouseId(data.docs._id),
                setLocation(data.docs.location),
                setSquareMeter(data.docs.squareMeter),
                setBedRoom(parseInt(data.docs.bed_room)),
                setMonthlyPayment(parseInt(data.docs.monthly_payment)),
                setFloor(parseInt(data.docs.floor)),
                setPhoneNumber(parseInt(data.docs.phone_number)),
                setGuestHouse(data.docs.guest_house) ? 'yes' : 'no',
                setDescription(data.docs.description),
                setAvailabilityDate(data.docs.availabilityDate),
                setListingStatus(data.docs.listingStatus),
                setReviewStatus(data.docs.reviewStatus),
                setEditedEncodedAvatarUrl(data.docs.encodedAvatarUrl)

        };
        loadData();

    }, [setTheDocs])


    const onFormSubmit = (e) => {
        e.preventDefault();

        validateForm(e);
    };
    const listingStatusFilter = (e) => {
        console.log(e.currentTarget.value, listingStatus)
        if (e.currentTarget.value === "NA" && listingStatus === "Submitted") {
            return "Draft"
        } else if (e.currentTarget.value === "Pending" && listingStatus === "Draft") {
            return "Submitted"
        }/*else if (e.currentTarget.value === "Inactive" && listingStatus === "Active"){
            return "Inactive"
        }else if (e.currentTarget.value === "Active" && listingStatus === "Inactive"){
            return "Active"
        }*/ else {
            return listingStatus
        }
    };
    const reviewStatusFilter = (e) => {

        return e.currentTarget.value;
    };
    const validateForm = (e) => {


        const product = {
            originalId: originalHouseId,
            ownerEmail: ownerEmail,
            location: location,
            squareMeter: squareMeter,
            description: description,
            bedRoom: parseInt(bedRoom),
            floor: parseInt(floor),
            monthlyPayment: parseInt(monthlyPayment),
            phoneNumber: parseInt(phoneNumber),
            guest_house: guestHouse === 'yes',


            availabilityDate: availabilityDate,
            listingStatus: listingStatusFilter(e),
            reviewStatus: reviewStatusFilter(e)
        };

        if (!location) {
            document.getElementById('locationError').style.display = 'block';
        }
        if (!floor) {
            document.getElementById('floorError').style.display = 'block';

        }
        if (!monthlyPayment) {
            document.getElementById('monthlyPaymentError').style.display = 'block';

        }
        if (!bedRoom) {
            document.getElementById('bedRoomError').style.display = 'block';

        }
        /*if (!guestHouse) {
            document.getElementById('guestHouseError').style.display = 'block';

        }*/
        /* if (!phoneNumber) {
             document.getElementById('phoneNumber').style.display = 'block';

         }*/

        /*if (!file) {
            document.getElementById('dropZoneImage').style.display = 'block';
        }*/

        if (location &&
            floor && monthlyPayment
            && bedRoom
            && phoneNumber) {

            submitEditHouseApiRequest(product);

        } else {
            //for not yet validated
            console.log("Form Not Validated")

        }


    };

    const submitEditHouseApiRequest = async (newLaunchDetails) => {
        /*let user = props.getToken();*/

        const formData = new FormData();
        formData.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };

        let response = await backEndApi.post('/editHouseUpdate', {params: newLaunchDetails});
        /*let resImage = await backEndApi.post('/uploadProductImage', formData, config);*/


        console.log("The files and Image success fully uploaded" + response);
        setIsRedirectToHomepage(true)

    };

    const choseButton = () => {

        switch (listingStatus) {
            case 'Active' :
                if (reviewStatus === "Pending" || reviewStatus === "Rejected") {
                    return <React.Fragment>

                        <Button onClick={onFormSubmit} value='Approved' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}>Cancel Review</Button>
                        <Button onClick={onFormSubmit} value='Pending' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>;
                } else if (reviewStatus === "Approved") {
                    return <React.Fragment>

                        <Button onClick={onFormSubmit} value='Pending' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>
                } else {
                    return <React.Fragment>
                        <Button onClick={onFormSubmit} value='' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}>Cancel Review</Button>
                        <Button onClick={onFormSubmit} value='' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>
                }

            case 'Inactive' :
                if (reviewStatus === "Pending" || reviewStatus === "Rejected") {
                    return <React.Fragment>

                        <Button onClick={onFormSubmit} value='Approved' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}>Cancel Review</Button>
                        <Button onClick={onFormSubmit} value='Pending' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>;
                } else if (reviewStatus === "Approved") {
                    return <React.Fragment>

                        <Button onClick={onFormSubmit} value='Pending' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>
                } else {
                    return <React.Fragment>
                        <Button onClick={onFormSubmit} value='' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}>Cancel Review</Button>
                        <Button onClick={onFormSubmit} value='' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>
                }
            case 'Draft' :
                return <React.Fragment>
                    <Button onClick={onFormSubmit} value='NA' variant='contained' style={{
                        paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                        borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                    }}>Save As Draft</Button>
                    <Button onClick={onFormSubmit} value='Pending' variant='contained' style={{
                        paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                        borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                    }}>Submit For Review</Button>

                </React.Fragment>;
            case 'Submitted' :
                if (reviewStatus === "Pending" || reviewStatus === "Rejected") {
                    return <React.Fragment>
                        <Button onClick={onFormSubmit} value='NA' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}>Cancel Review</Button>
                        <Button onClick={onFormSubmit} value='Pending' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>;
                } else if (reviewStatus === "Approved") {
                    return <React.Fragment>
                        <Button onClick={onFormSubmit} value='Pending' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>
                } else {
                    return <React.Fragment>
                        <Button onClick={onFormSubmit} value='Draft' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}>Cancel Review</Button>
                        <Button onClick={onFormSubmit} value='Submitted' variant='contained' style={{
                            paddingLeft: '50px', paddingRight: '50px', background: '#005CC8',
                            borderRadius: '5px', marginRight: '15px', color: '#fff', textTransform: 'none'
                        }}> Update Detail</Button>

                    </React.Fragment>
                }
            default:
                return <div>Something occur</div>
        }
    };

    const onLocationChanged = (e) => {
        console.log(file);
        if (e.target.value.length === 0) {

            document.getElementById('locationError').style.display = 'block';
        } else {
            document.getElementById('locationError').style.display = 'none';

        }
        setLocation(e.target.value)
    };

    const onDescriptionChanged = (e) => {
        setDescription(e.target.value)
    };
    const onFloorchanged = (e) => {
        if (e.target.value === 'Select Floor') {
            document.getElementById('floorError').style.display = 'block';

        } else {
            document.getElementById('floorError').style.display = 'none';
        }
        setFloor(e.target.value)
    };
    const onMonthlyPaymentChanged = (e) => {
        if (e.target.value.length === 0) {
            document.getElementById('monthlyPaymentError').style.display = 'block';
        } else {
            document.getElementById('monthlyPaymentError').style.display = 'none';
        }

        setMonthlyPayment(e.target.value)
    };
    const onBedroomChanged = (e) => {
        if (e.target.value.length === 'Select Bed Rooms') {
            document.getElementById('bedRoomError').style.display = 'block';

        } else {
            document.getElementById('bedRoomError').style.display = 'none';

        }
        setBedRoom(e.target.value)
    };
    const onGuestHouseChanged = (e) => {

        if (e.target.value.length === 0) {
            document.getElementById('guestHouseError').style.display = 'block';

        } else {
            document.getElementById('guestHouseError').style.display = 'none';

        }

        setGuestHouse(e.target.value === 'yes' ? 'yes' : 'no')
    };
    const onPhoneNumberChanged = (e) => {

        if (e.target.value.length === 0) {
            document.getElementById('phoneNumberError').style.display = 'block';

        } else {
            document.getElementById('phoneNumberError').style.display = 'none';

        }


        setPhoneNumber(e.target.value)


    };
    const onAvailabilityChanged = (date) => {

        console.log(date);
        if (date === null) {
            document.getElementById('availabilityError').style.display = 'block';

        } else {
            document.getElementById('availabilityError').style.display = 'none';

        }

        setAvailabilityDate(date)
    };
    const onSquareMeterChanged = (e) => {
        setSquareMeter(e.target.value)
    };
    const onDropZoneChange = (e) => {

        /*setFile(e)*/

    };


    if (!props.getToken()) {
        return <Redirect to='/login'/>
    }
    if (isRedirectToHomepage) {
        return <Redirect to='/dashboard'/>
    }
    return (
        <Container>
            <Container className={classes.root}>
            <Typography variant='h5' style={{marginBottom: '30px', marginTop: '35px', marginLeft: '-15px'}}>Edit
                House</Typography>

            <Grid container className={classes.firstGrid} spacing={4}>
                <Grid item xs={12} md={6}>
                    <form>
                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>Location of the Condominium</Typography>
                            <input type="text" list='locationOfCondominium' name='Myname'
                                   placeholder='Enter Location of the condominium'
                                   className={classes.input}
                                   onChange={onLocationChanged}
                                   value={location}

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
                                to
                                entered Location of your condominium.</Typography>

                        </div>
                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>Bed Rooms</Typography>
                            <select className={classes.input} value={bedRoom}
                                    onChange={onBedroomChanged}>
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

                            <select className={classes.input} value={floor}
                                    onChange={onFloorchanged}>
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
                            <input type="number" min='0' placeholder='eg, 5000' className={[classes.input]}
                                   onChange={onMonthlyPaymentChanged}
                                   value={monthlyPayment}


                            />
                            <Typography variant='body2' id='monthlyPaymentError' className={classes.inputError}>you
                                have to
                                enter monthly payment.</Typography>

                        </div>

                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>Short description <span
                                style={{opacity: '0.5'}}>(optional)</span></Typography>
                            <textarea className={classes.textarea} placeholder='Enter short description...'
                                      style={{marginTop: '5px',}} onChange={onDescriptionChanged}
                                      value={description}
                            />


                        </div>

                    </form>
                </Grid>
                <Grid item xs={12} md={6} >
                    <form>
                        {/*<div className={classes.inputsContainer}>
                        <Typography variant='body2'>Upload house image</Typography>

                        <Grid style={{marginTop: '5px'}}>
                            <Grid itme xs={12} md={6} className={classes.dropZone}>
                                <DropzoneArea
                                    acceptedFiles={['image/*']}
                                    maxFileSize={2000000}
                                    filesLimit={'6'}
                                    dropzoneText={"Drag and drop an image here or click"}
                                    onChange={onDropZoneChange}
                                    initialFiles={[`http://localhost:5000/images/products/${theDocs ? theDocs.docs.ownerEmail : ''}/${theDocs ? theDocs.docs._id : ''}/${theDocs ? theDocs.files[0] : ''}`]
                                    }

                                />
                                {console.log(theDocs.files, `and then`)}
                                {console.log(`http://localhost:5000/images/products/${theDocs ? theDocs.docs.ownerEmail : ''}/${theDocs ? theDocs.docs._id : ''}/${theDocs ? theDocs.files[0] : ''}`, `why then`)}
                            </Grid>
                        </Grid>
                    </div>*/}
                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>Square meters <span
                                style={{opacity: '0.5'}}>(optional)</span></Typography>
                            <input type="text" list='squareMetersInput' placeholder='Square meters of your house'
                                   className={classes.input}
                                   onChange={onSquareMeterChanged}
                                   value={squareMeter}

                            />
                            <datalist id='squareMetersInput'>
                                <option value="4 x 4"></option>
                                <option value="3 x 4"></option>
                                <option value="5 x 4"></option>
                                <option value="5 x 3"></option>
                            </datalist>

                            <Typography variant='body2' id='networkError' className={classes.inputError}>You have to
                                enter square meters.</Typography>

                        </div>
                        <div className={[classes.inputsContainer]}>
                            <Typography variant='body2'>Available for rent starting from</Typography>
                            {/* <input type="text" placeholder='Enter product name' className={classes.input}
                                   onChange={onAvailabilityChanged}/>*/}
                            <div className={classes.dataPicker}>
                                <DatePicker
                                    dateFormat="dd-MM-yyyy"
                                    selected={availabilityDate}
                                    className={[classes.input]}
                                    onChange={onAvailabilityChanged}
                                    value={moment(availabilityDate).format("DD-MM-YYYY")}

                                />
                            </div>
                            <Typography variant='body2' id='availabilityError' className={classes.inputError}>You
                                have to
                                Set Launch Data.</Typography>

                        </div>
                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>phone number</Typography>
                            <div style={{position: 'relative'}}>
                                <input type="number" placeholder='Enter your phone number' className={classes.input}
                                       onChange={onPhoneNumberChanged}
                                       value={phoneNumber}
                                       style={{paddingLeft: '50px'}}


                                />
                                <span
                                    style={{position: 'absolute', left: 7, top: "35%", opacity: '0.5'}}>+251</span>
                            </div>

                            <Typography variant='body2' id='phoneNumberError' className={classes.inputError}>You
                                have
                                to enter your phone number.</Typography>


                        </div>
                        <div className={classes.inputsContainer}>
                            <Typography variant='body2'>is it Guest House</Typography>
                            <label htmlFor="guestYes">Yes</label>
                            <input type="radio" value='yes' id='guestYes' checked={guestHouse === 'yes'}
                                   name='guestRadio' placeholder='is it Guest House'
                                   onChange={onGuestHouseChanged}

                            />
                            <label htmlFor="guestNo">No</label>

                            <input type="radio" value='no' id='guestNo' name='guestRadio'
                                   onChange={onGuestHouseChanged}
                                   checked={guestHouse === 'no'}

                            />
                            <Typography variant='body2' id='guestHouseError' className={classes.inputError}>You have
                                specific if it is guesthouse.</Typography>


                        </div>


                    <br/><br/><br/><br/>
                    <div align='right'>
                        {choseButton()}
                    </div>
                    </form>

                </Grid>

            </Grid>
        </Container></Container>

    )

}

export default withStyles(useStyles)(EditHouse);



