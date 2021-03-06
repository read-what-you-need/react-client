import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { SearchContext } from './SearchContextMangement';

import SnippetLoader from '../../Loaders/SnippetLoader'
import ImpLineItems from './ImpLineModules/ImpLineItems'

import Chip from '@material-ui/core/Chip';


import { Container, Row, Col } from 'reactstrap';

import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
    GET_USER_QUERY_BOOKMARK_STATUS
} from './../../queries';



const ImpLines = ({ uuid, session }) => {


    let smartSearchEndPoint = "http://localhost:8891"


    // pdfText recieved from the db in the parent component

    const state = useContext(SearchContext);

    //console.log(state.search, ": value from search box landing 😁 ")
    //console.log(state.sessionId, ": sessionID is 😛")
    const [smartSearchResults, setSmartSearch] = useState('')
    const [textLoading, setTextLoading] = useState(null);
 
    const [resultsCount, setResultsCount] = useState(5);

    const [bookmarkStatus, setBookMarkStatus] = useState([0]);

    // //console.log(pdfText, "in imp lines hehehehe")

    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json'

        }
    }

    let axiosPayload = {

        "uuid": uuid, "text": state.search,

        "top": resultsCount, "accuracyGreaterThan": 0.2

    }


    useEffect(() => {

        setTextLoading(true);
       

        setResultsCount(5)

        if (state.search !== '') {

            axios.post(
                smartSearchEndPoint,
                axiosPayload,
                axiosConfig
            )
                .then(res => {

                    console.log(res.statusText, res.data)

                    setSmartSearch(res.data);
                    setTextLoading(false);

                }).catch(function (error) {
                    //console.log(error);
                });
                
                getUserBookmarkStatus({ variables: { uuid, query: state.search }})

                
    
        }


    }, [state.search]);


    useEffect(() => {

        setTextLoading(true);

        if (state.search !== '') {
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
        }




    }, [resultsCount]);


    useEffect(() => {


    }, [bookmarkStatus]);



    const [getUserBookmarkStatus, { loading: bookmarkDataLoading, error: bookmarkStatusError,
        data: bookmarkStatusData }] =
        useLazyQuery(GET_USER_QUERY_BOOKMARK_STATUS, {onCompleted (data) {
            setBookMarkStatus(data.getUserBookmarkStatus)
   
        }});


    console.log('bookmarks', bookmarkStatusData, bookmarkStatus )


    var ContentPlaceholder = [1, 2];


    return (

        <Container className="top-key-words-container">

            <Row className="important-lines-header">
                <span >
                    Matching lines for <i> {state.search == '' ? '...' : state.search}</i>
                </span>

                <span id="book-percent" style={{ backgroundColor: '#90ee9073' }}>
                    100 % loaded
                    </span>


            </Row>



            <hr />
       
            {textLoading ? ContentPlaceholder.map(idx => (
                <SnippetLoader key={Math.random()} />
            ))

                :

                Object.entries(smartSearchResults).map(
                    ([key, value], i) => {
                        
                        return < ImpLineItems key={Math.random()}
                        bookmarkFlag={bookmarkStatus[i+1]} uuid={uuid} session={session}
                        content={key} score={value} itemNo={i} />
                    })

            }

            <div className="App">
                {(Object.entries(smartSearchResults)).length < 1 ? <SnippetLoader key={Math.random()} /> : null}
                {!textLoading && (Object.entries(smartSearchResults)).length < 1 ? <Chip label={'No results found 😕'} /> : null}
                {!textLoading && (Object.entries(smartSearchResults)).length > resultsCount - 1 ? <Chip clickable onClick={e => {
                    e.preventDefault()
                    setResultsCount(resultsCount + 5)
                }}

                    label={'load more'} /> : null}
            </div>

            <div style={{ PaddingBottom: 30 }}>
                <hr />
            </div>


        </Container>
    );
}

export default ImpLines;
