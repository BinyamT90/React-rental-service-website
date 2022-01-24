import React, {useEffect} from 'react';
import Collapse from "@material-ui/core/Collapse";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from "clsx";
import {useMediaQuery, useTheme, withStyles} from "@material-ui/core";

const useStyles = ((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '15px',
        borderRadius: '7px',
        /*background: '#ffffff',*/
        /*boxShadow: '0 3px 2px rgb(0 0 0 / 0.2)',*/
        border: '1px solid #eeeeee',
        "& label": {
            display: 'block',
            cursor: 'pointer',

        }
    },
    rowHolder: {
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
        padding: '10px 0',
        cursor: 'pointer',
        minWidth: '210px',


    },
    borderRadiuss: {
        borderBottom: '1px solid #eeeee',
        borderTop: '1px solid #eeeeee',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        minWidth: '200px',
        alignItems: 'center',
    },
    listHolder: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginLeft: 10,
    },
    expand: {
        color: '#005CC8',
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
    guestInput: {
        marginRight: 10,
    },
    inputs: {
        marginRight: 10,
    }

}));

function Filter(props) {
    const {classes} = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const locations = ['Ayat', 'Gelan', 'Yeka Abado', 'Submit', 'Tuludimtu', '4 killo', 'Gotera', 'Balderas', 'Mebrathail', 'Jemo', 'Klinto'];
    const monthlyRents = ['2000 - 4000 ', '4001 - 6000', '6001 - 8000', '8001 - 12000', '12001 - 20000', '> 20000'];
    const bedRooms = [0, 1, 2, 3, 4];

    const [elocation, seteElocation] = React.useState(false);
    const [ebedRoom, setEbedRoom] = React.useState(false);
    const [emonthlyRent, setEmonthlyRent] = React.useState(true);


    const [locationsState, setLocationsState] = React.useState(new Array(locations.length).fill(false));
    const [monthlyRentsState, setMonthlyRentsState] = React.useState(new Array(monthlyRents.length).fill(false));
    const [bedRoomsState, setBedroomsState] = React.useState(new Array(bedRooms.length).fill(false));
    const [guestHouseState, setGuestHouseState] = React.useState(false);

    useEffect(() => {

        let locas = [];
        for (let i = 0; i < locationsState.length; i++) {
            if (locationsState[i]) {
                locas.push(locations[i])
            } 
        }
        props.setLocation(locas)
    }, [locationsState]);

    useEffect(() => {
        let pay = [];
        for (let i = 0; i < monthlyRentsState.length; i++) {
            if (monthlyRentsState[i]) {
                pay.push(i)
            }
        }

        props.setPayment(pay)
    }, [monthlyRentsState]);


    useEffect(() => {
        let rooms = [];
        for (let i = 0; i < bedRoomsState.length; i++) {
            if (bedRoomsState[i]) {
                rooms.push(i)
            }
        }
        props.setBedrooms(rooms)
    }, [bedRoomsState]);

    useEffect(()=>{
        props.setGuestHouses(guestHouseState);
        console.log(guestHouseState);
    }, [guestHouseState]);
    const onEbedRoomClick = () => {
        setEbedRoom(!ebedRoom);
    };
    const onElocationClick = () => {
        seteElocation(!elocation);
    };
    const onEmonthlyRentClick = () => {
        setEmonthlyRent(!emonthlyRent);
    };

    const onLocationsChanged = (position) => {
        const updatedCheckedState = locationsState.map((item, index) =>
            index === position ? !item : item
        );

        setLocationsState(updatedCheckedState);
    };
    const onMonthlyRentsChanged = (position) => {
        const updatedCheckedStatem = monthlyRentsState.map((item, index) =>
            index === position ? !item : item
        );

        setMonthlyRentsState(updatedCheckedStatem);
    };
    const onBedroomsChanged = (position) => {
        const updatedCheckedState = bedRoomsState.map((item, index) =>
            index === position ? !item : item
        );
        setBedroomsState(updatedCheckedState);
    };
    const onGuestHouseChanged = () => {
        setGuestHouseState(!guestHouseState);

        console.log(guestHouseState, 'guest');
    };
    return (
        <div className={classes.root} style={{margin: isMobile ? '10px 0' : 0}}>
            <h3>Filter By</h3>
            <div className={classes.rowHolder}>
                <div className={classes.row} onClick={onEmonthlyRentClick}>
                    <span>Monthly Payment</span>
                    <button
                        name="payment"
                        className={clsx(classes.showButton, classes.expand, {
                            [classes.expandOpen]: emonthlyRent,
                        })}
                    >
                        <ExpandMoreIcon/>
                    </button>
                </div>
                <Collapse in={emonthlyRent} timeout="auto" unmountOnExit>
                    <div className={classes.listHolder}>{monthlyRents.map((name, index) => {
                        return (
                            <div key={index}>
                                <label><input
                                    type="checkbox"
                                    id={`monthlyRent-${index}`}
                                    name={name}
                                    value={name}
                                    className={classes.inputs}
                                    checked={monthlyRentsState[index]}
                                    onChange={() => onMonthlyRentsChanged(index)}
                                />{name} <span style={{opacity: '0.5'}}>birr</span></label>
                            </div>
                        );
                    })}</div>
                </Collapse>
            </div>
            <div className={clsx(classes.rowHolder, classes.borderRadiuss)}>
                <div className={classes.row} onClick={onEbedRoomClick}>
                    <span>Number of Bedrooms</span>
                    <button
                        className={clsx(classes.showButton, classes.expand, {
                            [classes.expandOpen]: ebedRoom,
                        })}
                    >
                        <ExpandMoreIcon/>
                    </button>
                </div>
                <Collapse in={ebedRoom} timeout="auto" unmountOnExit>
                    <div className={classes.listHolder}>{bedRooms.map((name, index) => {
                        return (
                            <div key={index}>
                                <label><input
                                    data-cy="content1"
                                    type="checkbox"
                                    id={`location-${index}`}
                                    name={name}
                                    value={name}
                                    className={classes.inputs}
                                    checked={bedRoomsState[index]}
                                    onChange={() => onBedroomsChanged(index)}
                                />{name}</label>
                            </div>
                        );
                    })}</div>

                </Collapse>
            </div>
            <div className={clsx(classes.rowHolder, classes.borderRadiuss)}>
                <div className={classes.row} onClick={onElocationClick}>
                    <span>Location of Condominium</span>
                    <button
                        className={clsx(classes.showButton, classes.expand, {
                            [classes.expandOpen]: elocation,
                        })}
                    >
                        <ExpandMoreIcon/>
                    </button>
                </div>
                <Collapse in={elocation} timeout="auto" unmountOnExit>
                    <div className={classes.listHolder}>{locations.map((name, index) => {
                        return (
                            <div key={index}>
                                <label><input
                                    data-cy="content"
                                    type="checkbox"
                                    id={`location-${index}`}
                                    name={name}
                                    value={name}
                                    className={classes.inputs}
                                    checked={locationsState[index]}
                                    onChange={() => onLocationsChanged(index)}
                                />{name} Condominium</label>
                            </div>
                        );
                    })}</div>
                </Collapse>
            </div>
            <div className={clsx(classes.rowHolder, classes.borderRadiuss)}>
                <div>
                    <label style={{display: 'flex', justifyContent: 'space-between'}}>
                        Guest House <input type="checkbox" className={classes.guestInput}
                                           value={guestHouseState}
                                           onChange={onGuestHouseChanged}/></label>

                </div>
            </div>
        </div>
    );
}

export default withStyles(useStyles)(Filter);
