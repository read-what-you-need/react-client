import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { SearchContext } from './SearchContextMangement';

import SnippetLoader from '../../Loaders/SnippetLoader'
import ImpLineItems from './ImpLineModules/ImpLineItems'

import Chip from '@material-ui/core/Chip';


import { Container, Row, Col } from 'reactstrap';


const ImpLines = ({ pdfText }) => {

    const state = useContext(SearchContext);

    //console.log(state.search, ": value from search box landing 😁 ")
    //console.log(state.sessionId, ": sessionID is 😛")
    const [smartSearchResults, setSmartSearch] = useState('')
    const [textLoading, setTextLoading] = useState(null);
    const [resultsCount, setResultsCount] = useState(5);

    const [demoSessionStatus, setDemoSessionStatus] = useState(null);

    // //console.log(pdfText, "in imp lines hehehehe")

    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json'

        }
    }

    let axiosPayload = {

        "corpus": pdfText, "text": state.search, "top": resultsCount,

        "sessionId": state.sessionId, "accuracyGreaterThan": 0.2

    }



    let smartSearchEndPoint = "https://347l7v8bif.execute-api.ap-south-1.amazonaws.com/ironbox"


    


    useEffect(() => {

        setTextLoading(true);
        if (demoSession.includes(state.sessionId)){
            setDemoSessionStatus(true)
        }        

        setResultsCount(5)

        axios.post(
            smartSearchEndPoint,
            axiosPayload,
            axiosConfig
        )
            .then(res => {

                ////console.log(res.statusText, res.data)

                setSmartSearch(res.data);
                setTextLoading(false);

            }).catch(function (error) {
                //console.log(error);
            });



    }, [state.search]);


    useEffect(() => {

        setTextLoading(true);


        axios.post(
            smartSearchEndPoint,
            axiosPayload,
            axiosConfig
        )
            .then(res => {

                //.log(res.statusText, res.data)

                setSmartSearch(res.data);
                setTextLoading(false);

            }).catch(function (error) {
                //console.log(error);
            });



    }, [resultsCount]);



    var ContentPlaceholder = [1, 2];

    const demoSession = ['benj', 'naval', 'think']

    return (

        <Container className="top-key-words-container">

            <Row className="important-lines-header">
                <span >
                    Matching Lines for <i> {state.search == '' ? '...' : state.search}</i>
                </span>


                {demoSession.includes(state.sessionId) ?
                    <span id="book-percent" style={{backgroundColor:'#90ee9073'}}>
                        100 % loaded
                    </span>

                    :
                    <span id="book-percent" style={{backgroundColor:'rgb(255 255 21 / 31%)'}}>
                        20% loaded
                </span>
                }


            </Row>



            <hr />


            {textLoading ? ContentPlaceholder.map(idx => (
                <SnippetLoader key={Math.random()} />
            )) : Object.entries(smartSearchResults).map(
                ([key, value], i) =>
                    <ImpLineItems key={Math.random()} content={key} score={value} itemNo={i}/>

            )}

            <div className="App">
                {demoSessionStatus && (Object.entries(smartSearchResults)).length < 1 ? <SnippetLoader key={Math.random()} /> : null}
                {!demoSessionStatus && !textLoading && (Object.entries(smartSearchResults)).length < 1 ? <Chip label={'No results found 😕'} /> : null}
                {(Object.entries(smartSearchResults)).length > resultsCount - 1 ? <Chip clickable onClick={() => { setResultsCount(resultsCount + 5) }}

                    label={'load more'} /> : null}
            </div>

            <div style={{ PaddingBottom: 30 }}>
                <hr />
            </div>


        </Container>
    );
}

export default ImpLines;