import React, {useState} from 'react';
import {withStyles} from "@material-ui/core";
import {useHistory} from "react-router-dom";


const useStyles = ((theme) => ({
    searchBarHolder: {
        position: 'relative',
        width: '70%',
        padding: 0,
        margin: 0,
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
    textAndInput: {
        display: 'flex', alignItems: 'center', width: '80%', flexDirection: 'column', height: '70vh',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    }


}));

function Search(props) {
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const onFormSubmit = async (e) => {
        e.preventDefault();
        history.push(`/search?q=${keyword}`)
    }

    const onInputChange = async (e) => {
        setKeyword(e.target.value)
    };

    const {classes} = props;
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className={classes.textAndInput}>
                <h1 style={{fontSize: '40px'}}><span style={{color: '#ee662d'}}>A</span>genagn </h1>

                <form className={classes.searchBarHolder} onSubmit={onFormSubmit}>
                    <input id="search" name="search" type="text" value={keyword} placeholder="Ayat Condominium"
                           className={classes.searchBar} onChange={onInputChange}/>
                    <i className="fas fa-search fa-lg"
                       style={{position: 'absolute', left: 15, top: 109, opacity: '0.4'}}></i>
                </form>
            </div>
        </div>
    );
}

export default withStyles(useStyles)(Search);
