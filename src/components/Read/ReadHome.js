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
    //console.log(props.match.params)
    
    // if query is already passed as query string
    const query = queryString.parse(props.location.search)


    // manages the whole search context across components
    const state = useContext(SearchContext);


    const [fileProcessStatus, setfileProcessStatus] = useState();
   
    const [fileName, setFileName] = useState('');


    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
        GET_FILE_DETAILS, {
        variables: { uuid: _id }, onCompleted(data) {
            //console.log('process status', data)
            var res = Object(queryData.getFileDetails)
            setfileProcessStatus(res['processStatus'])
            setFileName(res['name'])
        }
    })




    return (
        <Container fluid style={{ paddingRight: 0, paddingLeft: 0, marginBottom: 80 }}>

            <Row>

                <Col md="2">


                </Col>

                <Col md="10">
                    <div className="App-read-page">


                        {/* <h1 className="read-page-header">Read what you need</h1> */}
                        <h1 className="read-page-file-name">{fileName}</h1>


                        {fileProcessStatus === "true" ? <SearchContextProvider sessionId={_id} query={query.query}>


                            
                            <SmartSearch />

                            <div style={{ height: 10 }}></div>

                            <TopWords uuid={_id} query={query.query}/>


                            <div style={{ height: 10 }}></div>

                            <ImpLines uuid={_id} session={session} />

                            <div style={{ height: 10 }}></div>

                            <TopQuestions uuid={_id} />

                        </SearchContextProvider> : fileProcessStatus === "false" ? <UnderProcess /> : null}


                        <div style={{ height: 10 }}></div>

                        <img src={"https://healthchecks.io/badge/9eb09fbb-348a-4316-ba4d-c2e543/z-XVoCmN-2/search-function.svg"}/>
                        
                        <br/>

                        <div style={{ height: 10 }}></div>

                        <img src={"https://healthchecks.io/badge/9eb09fbb-348a-4316-ba4d-c2e543/e0lWy4vv-2/question-generator.svg"}/>

                        



                    </div>
                </Col>


            </Row>





        </Container>
    );
}

export default ReadHome;

