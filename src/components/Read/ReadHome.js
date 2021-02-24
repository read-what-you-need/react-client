import React, { useEffect, useState, useContext } from 'react';
import queryString from 'query-string';

import { Link } from 'react-router-dom';

import TopWords from './TopWords'
import ImpLines from './ImpLines'
import TopQuestions from './TopQuestions'


import Discover from './Discover'


import { Container, Row, Col } from 'reactstrap';
import SmartSearch from './SmartSearch';
import { SearchContextProvider, SearchContext } from './SearchContextMangement';

import UnderProcess from './UnderProcess';

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    GET_FILE_DETAILS
} from './../../queries';





const ReadHome = ({ session, props }) => {

    // get from view or params from the url
    const _id = props.match.params._id;
    console.log(props.match.params)
    
    // if query is already passed as query string
    const query = queryString.parse(props.location.search)


    // manages the whole search context across components
    const state = useContext(SearchContext);


    const [fileProcessStatus, setfileProcessStatus] = useState(true);
   
    const [fileName, setFileName] = useState('');


    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
        GET_FILE_DETAILS, {
        variables: { uuid: _id }, onCompleted(data) {
            var res = Object(queryData.getFileDetails)
            setfileProcessStatus(res['processStatus'])
            setFileName(res['name'])
        }
    })

    // useEffect(() => {
    //     //setting search query for important lines as the query 
    //     // recieved from the url as query string
    //     state.setSearch(query.query)
    // }, [])



    return (
        <Container fluid style={{ paddingRight: 0, paddingLeft: 0, marginBottom: 50 }}>

            <Row>

                <Col md="2">


                </Col>

                <Col md="10">
                    <div className="App-read-page">


                        {/* <h1 className="read-page-header">Read what you need</h1> */}
                        <h1 className="read-page-file-name">{fileName}</h1>


                        {fileProcessStatus ? <SearchContextProvider sessionId={_id} query={query.query}>


                            
                            <SmartSearch />

                            <div style={{ height: 10 }}></div>

                            <TopWords uuid={_id} query={query.query}/>


                            <div style={{ height: 10 }}></div>

                            <ImpLines uuid={_id} session={session} />

                            <div style={{ height: 10 }}></div>

                            <TopQuestions uuid={_id} />

                        </SearchContextProvider> : <UnderProcess />}



                    </div>
                </Col>


            </Row>





        </Container>
    );
}

export default ReadHome;

