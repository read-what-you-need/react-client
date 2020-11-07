import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { SearchContext } from './SearchContextMangement';

import SnippetLoader from '../../Loaders/SnippetLoader'
import ImpLineItems from './ImpLineModules/ImpLineItems'

import Chip from '@material-ui/core/Chip';


import { Container, Row, Col } from 'reactstrap';


const ImpLines = ({ pdfText }) => {

    const state = useContext(SearchContext);

    console.log(state.search, ": value from search box landing 😁 ")
    console.log(state.sessionId, ": sessionID is 😛")
    const [smartSearchResults, setSmartSearch] = useState('')
    const [textLoading, setTextLoading] = useState(null);
    const [resultsCount, setResultsCount] = useState(5);

    // console.log(pdfText, "in imp lines hehehehe")

    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json'

        }
    }

    let axiosPayload = {

        "corpus": pdfText, "text": state.search, "top": resultsCount,

        "sessionId": state.sessionId, "accuracyGreaterThan": 0.2

    }

    console.log(smartSearchResults)


    useEffect(() => {

        setTextLoading(true);

        setResultsCount(5)

        axios.post(
            "http://localhost:8890",
            axiosPayload,
            axiosConfig
        )
            .then(res => {

                console.log(res.statusText, res.data)

                setSmartSearch(res.data);
                setTextLoading(false);

            }).catch(function (error) {
                console.log(error);
            });



    }, [state.search]);


    useEffect(() => {

        setTextLoading(true);


        axios.post(
            "http://localhost:8890",
            axiosPayload,
            axiosConfig
        )
            .then(res => {

                console.log(res.statusText, res.data)

                setSmartSearch(res.data);
                setTextLoading(false);

            }).catch(function (error) {
                console.log(error);
            });



    }, [resultsCount]);



    var ContentPlaceholder = [1, 2];

    return (

        <Container className="top-key-words-container">

            <p>Matching Lines for <i> {state.search == '' ? '...' : state.search}</i> </p>

            <hr />


            {textLoading ? ContentPlaceholder.map(idx => (
                <SnippetLoader key={Math.random()} />
            )) : Object.entries(smartSearchResults).map(
                ([key, value], i) =>
                    <ImpLineItems key={Math.random()} content={key} score={value} />

            )}

            <div className="App">
                {!textLoading &&(Object.entries(smartSearchResults)).length < 1 ? <Chip label={'No results found 😕'} /> : null}
                {(Object.entries(smartSearchResults)).length > resultsCount-1 ? <Chip clickable onClick={() => { setResultsCount(resultsCount+5)}} 
                
                label={'load more'} /> : null}
            </div>

            <div style={{ PaddingBottom: 30 }}>
                <hr />
            </div>


        </Container>
    );
}

export default ImpLines;