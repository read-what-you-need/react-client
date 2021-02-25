import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Container, Row, Col } from 'reactstrap';
import Divider from '@material-ui/core/Divider';

import { Share } from "react-twitter-widgets";

const BookmarkLines = ({ props }) => {


    const [query, setQuery] = useState('')
    const [lines, setLines] = useState([])
    const [uuidName, setUuidName] = useState('')
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

    let bookmarkedLinesPoint = 'http://127.0.0.1:4444/api/v2/getBookmarkLines/' + user + '/' + uuid + '/' + queryId

    // get ???????????????? file name from uuid

    useEffect(() => {
        axios.get(
            bookmarkedLinesPoint,
            axiosConfig
        )
            .then(res => {


                setQuery(res.data['query'])
                setLines(lines.concat(res.data['lines']))
                setUuidName(res.data['uuidName'])

                setResultsLoadStatus(true)


                return res
            })

    }, [])

    console.log(lines, query)


    const queryElement = (uuid, queryId, query) => {
        const colors = ['#DFF2CC', 'rgba(241, 204, 242, 0.63)', 'rgba(245, 233, 123, 0.64)']

        return <Link to={'/read/' + uuid + '?query=' + query} style={{ textDecoration: 'none' }} >

            <Col style={{ backgroundColor: colors[queryId % 3] }} id={"query-file-name-header"} xs={12}>
                {query}

                <Col xs={12} id={'query-file-name-sub-header'}>
                    <span style={{ opacity: 0.45, fontSize: 16, color: 'black', marginRight: 5 }}>
                        from <i>“{uuidName}” </i>
                    </span>

                    <span style={{ opacity: 0.75, fontSize: 14, color: 'black', marginRight: 10 }}>
                        collected by <i style={{ fontSize: 16, color: 'black' }}>{user}</i>
                    </span>

                    <Share
                        title="hello"
                        url={window.location.href}
                        options={{ text: "Check " + query + " from filename. A thread.", hashtags: "readwhatyouneed,AIreadsyourbook" }}
                    />

                </Col>


        
            </Col>



        </Link>
    }

    const LineElement = (line, lineIndex) => {
        return <Col key={line['id']} className={"bookmark-line-element"} xs={12}>
            <span style={{ opacity: 0.5, fontStyle: "italic", marginRight: 5, fontSize: 12 }}>{lineIndex + 1}.</span> {line['line']}
        </Col>

    }



    return (

        <Container>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9" style={{ marginTop: 20 }}>

                    {/* <h1>{user}'s bookmark from </h1> */}
                    {resultsLoadStatus ? queryElement(uuid, queryId, query) : <p>Loading</p>}

                    {resultsLoadStatus ?

                        lines.map((line, lineIndex) => LineElement(line, lineIndex))


                        : <p>Loading</p>}








                </Col>


            </Row>
        </Container>
    );
}

export default BookmarkLines;