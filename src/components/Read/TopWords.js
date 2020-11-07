import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { SearchContext } from './SearchContextMangement';

import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import { Container, Row, Col } from 'reactstrap';

import KeyWordLoader from '../../Loaders/KeyWordLoader';

import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        marginRight: 20,
        marginBottom: 30,
        marginTop: 15,

    },
    label: {
        fontSize: 24
    },
});




const TopWords = ({ pdfText }) => {

    const state = useContext(SearchContext);

    const classes = useStyles();

    const [topN, setTopN] = useState([])
    const [textLoading, setTextLoading] = useState(null);

    let axiosConfig = {
        headers: {
            'Content-Type': 'text/plain'
        }
    }


    useEffect(() => {

        setTextLoading(true);

        axios.post(

            "https://eebepu2tvj.execute-api.ap-south-1.amazonaws.com/topN",

            pdfText,

            axiosConfig

        ).then(res => {

            console.log(res.statusText, res.data)

            setTopN(res.data)

            setTextLoading(false);

            var firstTopWord = Object.entries(res.data)[0][0];

            state.setSearch(firstTopWord);

        }).catch(function (error) {

            console.log(error);

        });



    }, []);


    var chipPlaceholder = [1, 2, 3, 4, 5];

    return (

        <Container className="top-key-words-container">

            <p>Top keywords</p>

            <Row style={{ justifyContent: "space-evenly" }}>

                {textLoading ? chipPlaceholder.map(idx => (

                    <KeyWordLoader key={Math.random()}/>

                )) :

                    Object.entries(topN).map(

                        ([key, value], i) =>


                                <Chip
                                    key={Math.random()}
                                    // avatar={<Avatar>{value}</Avatar>}

                                    onClick={(e) => {
                                        e.preventDefault();
                                        state.setSearch(key);
                                    }}
                                    classes={{
                                        root: classes.root,
                                        label: classes.label,
                                    }}

                                    label={key} />

                    )}


            </Row>


        </Container>
    );
}


export default TopWords;

