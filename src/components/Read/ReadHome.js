import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TopWords from './TopWords'
import ImpLines from './ImpLines'



import Discover from './Discover'


import { Container, Row, Col } from 'reactstrap';
import SmartSearch from './SmartSearch';
import { SearchContextProvider } from './SearchContextMangement';
import UnderProcess from './UnderProcess';

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    GET_FILE_DETAILS
} from './../../queries';





const ReadHome = ({ session, props }) => {

    // get from view or params from the url
    const _id = props.match.params._id;


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


    return (
        <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>

            <Row>

                <Col md="2">


                </Col>

                <Col md="10">
                    <div className="App-read-page">


                        {/* <h1 className="read-page-header">Read what you need</h1> */}
                        <h1 className="read-page-file-name">{fileName}</h1>


                        {fileProcessStatus ? <SearchContextProvider sessionId={_id}>



                            <SmartSearch />

                            <div style={{ height: 10 }}></div>

                            <TopWords uuid={_id} />


                            <div style={{ height: 10 }}></div>

                            <ImpLines uuid={_id} session={session} />


                        </SearchContextProvider> : <UnderProcess />}



                    </div>
                </Col>


            </Row>





        </Container>
    );
}

export default ReadHome;

