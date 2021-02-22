import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Container, Row, Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';

const BookmarkLines = ({ props }) => {


    const [query, setQuery] = useState('')
    const [lines, setLines] = useState([])
    const [resultsLoadStatus, setResultsLoadStatus] = useState(false)

    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json',
     
        }
    }

    // get params from the url
    const user = props.match.params.user;
    const uuid = props.match.params.uuid;
    const queryId = props.match.params.queryId;

    let bookmarkedLinesPoint = 'http://127.0.0.1:4444/api/v2/getBookmarkLines/'+user+'/'+uuid+'/'+queryId



    useEffect(() => {
        axios.get(
            bookmarkedLinesPoint,
            axiosConfig
        )
            .then(res => {


                setQuery(res.data['query'])
                setLines(lines.concat(res.data['lines']))
                setResultsLoadStatus(true)


                return res
            })

    }, [])

    console.log(lines, query)


    return (

        <Container>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9" style={{ marginTop: 20 }}>

                    <h1>{user}</h1>
                    {resultsLoadStatus ? <h3 key={queryId} >{query}</h3>: <p>Loading</p>}
                    
                    {resultsLoadStatus ?   
                    
                    lines.map((line, lineIndex) => <div><Divider/> <span key={line['id']}>{lineIndex+1}. {line['line']}</span> </div>)
                    
                    
                    : <p>Loading</p>}

                    
                    

                    <hr />

                   


                </Col>


            </Row>
        </Container>
    );
}

export default BookmarkLines;