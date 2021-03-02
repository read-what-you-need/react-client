import React, { useState, useContext } from 'react';

import { SearchContext } from './SearchContextMangement';


import SnippetLoader from '../../Loaders/SnippetLoader';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';


import { Container, Row, Col } from 'reactstrap';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import { useEffect } from 'react';





const SmartSearch = () => {
    
    const state = useContext(SearchContext);

    const [localInputValue, SetLocalInputValue ] = useState('');
    const classes = useStyles();
    
    const handleSearchChange = (event) => {
        SetLocalInputValue(event.target.value)
    }

    const handleSubmit = () => {
        state.setSearch(localInputValue);
    }

    const handleKeyPress = (e) => {
        if(e.keyCode == 13){
           ////console.log('enter value pressed 😁', e.target.value);
           state.setSearch(localInputValue);
        }
     }

    useEffect(() => {
        SetLocalInputValue(state.search)
    }, [state.search])

    ////console.log(localInputValue)

    return (
        <Container className="top-key-words-container">
            <CssTextField
                InputProps={{
                    startAdornment: <SearchIcon />
                }}
                value={localInputValue}
                variant="outlined"
                id="custom-css-outlined-input"
           
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                inputProps={{style: {fontSize: 24, marginLeft: 10}}}
            />
            <IconButton  onClick={handleSubmit}>
                <KeyboardReturnIcon />
            </IconButton>




        </Container >
    );
}

const useStyles = makeStyles(theme => ({
    customHoverFocus: {
        "&.MuiIconButton-root ": { marginTop: 20, background: 'rgba(239, 240, 246, 1)'},
      "&:hover, &.Mui-focusVisible": { backgroundColor: "lightgreen" }
    }
  }));


const CssTextField = withStyles({
    root: {
        background: 'rgba(239, 240, 246, 1)',
        margin: 15,
        width: '70%',
        borderRadius: 16,
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#f0e8e878',
                borderRadius: 16
            },
            '&:hover fieldset': {
                borderColor: '#ffffff'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'black',
            },
        },
    }
})(TextField);


export default SmartSearch;