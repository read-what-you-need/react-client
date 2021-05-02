import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { Badge } from 'reactstrap';

import withAuth from './../withAuth';

import Alert from '@material-ui/lab/Alert';


const Bookmark = ({ session }) => {

    let bookmarkedFilesPoint = process.env.REACT_APP_NODE_API_ENDPOINT+'/bookmarks'


    const [uuidList, setUuidsList] = useState([])
    const [uuidLast, setUuidLast] = useState(false)

    const [queryList, setQueryList] = useState([])
    const [queryLast, setQueryLast] = useState([])

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(1)



    const [resultsLoadStatus, setResultsLoadStatus] = useState(false)



    const token = localStorage.getItem('token');

    const username = session.getCurrentUser.username



    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    var axiosPayload = {

        "start": start,

        "end": end

    }


    useEffect(() => {
        axios.post(
            bookmarkedFilesPoint,
            axiosPayload,
            axiosConfig
        )
            .then(res => {

                console.log(res.data['uuids'])
                console.log(res.data['queries'])
                // initial load
                setUuidsList(uuidList.concat(res.data['uuids']))
                setQueryList(queryList.concat(res.data['queries']))

                // generating an array of lenght uuids list
                // so that the status of last query for a given uuid is stored
                var prevQueryLast = queryLast
                prevQueryLast = prevQueryLast.concat(res.data['uuids'].map((item) => false))
                setQueryLast(prevQueryLast)

                // if empty response is returned, then no more uuids present

                // update the status of the last uuid as true
                // so the "show more uuid" button is hidden
                if (res.data['uuids'].length === 0) {
                    //console.log('empty uuid list')
                    setUuidLast(true)
                }


                return res
            }).then(res => setResultsLoadStatus(true))

    }, [start])

    //console.log(queryLast)


    const handleMoreUuids = () => {

        setStart(queryList.length)

        setEnd(start + 3)



    }



    const handleMoreQueries = (uuid, queriesIndex, queryIndex) => {
        setResultsLoadStatus(false)

        var queries = axios.get(
            bookmarkedFilesPoint + '/' + uuid + '/' + queryIndex,
            axiosConfig

        ).then(res => {

            var queries = queryList
            queries[queriesIndex] = queries[queriesIndex].concat(res.data)

            if (res.data.length === 0) {
                // if empty response is returned, then no more elements present

                // update the status of the last query for a given uuid as true
                // so the "show more queries" button is hidden
                var updateQueryLast = [...queryLast]
                updateQueryLast[queriesIndex] = true

                setQueryLast(updateQueryLast)


            }

            setQueryList(queries)
            setResultsLoadStatus(true)


        })





    }

    const uuidElement = (uuidList, queriesIndex) => {
        const colors = ['#DFF2CC', 'rgba(241, 204, 242, 0.63)', 'rgba(245, 233, 123, 0.64)']

        return <Link to={'/read/' + uuidList[queriesIndex]['uuid']} style={{ textDecoration: 'none' }}>
            <h4 style={{ backgroundColor: colors[queriesIndex % 3] }} id={"uuid-file-name-header"}>
                <span style={{ opacity: 0.5, fontStyle: "italic", marginRight: 5, fontSize: 14 }}>
                    {queriesIndex + 1}.
                    </span>
                {uuidList[queriesIndex]['name']}</h4>
        </Link>
    }


    const queryElement = (username, uuidList, queriesIndex, query) => {
        return <Link to={'/bookmarks/' + username + '/' + uuidList[queriesIndex]['uuid'] + '/' + query['id']} style={{ textDecoration: 'none' }} >
            <Col className={"bookmark-query-element"} xs={{ size: 11, offset: 1 }}>
                {query['query']}
            </Col>
        </Link>
    }


    const moreQueriesElement = (uuidList, queriesIndex, queryIndex) => {
        return <Col xs={{ size: 2, offset: 5 }}>
            <Badge color="primary"
                style={{
                    color: '#525252',
                    backgroundColor: '#d3d3d3ba',
                    fontWeight: 300
                }}
                onClick={(event) => {
                    event.preventDefault()
                    handleMoreQueries(uuidList[queriesIndex]['uuid'], queriesIndex, queryIndex)
                }} >more queries
            </Badge>
        </Col >
    }

    const moreUuidsElement = () => {
        return <Col xs={{ size: 2, offset: 5 }} style={{ marginTop: 20 }}>
            <Badge color="primary"
                style={{
                    color: '#525252',
                    backgroundColor: '#d3d3d3ba',
                    fontWeight: 300,
                    padding: 10
                }}
                onClick={(event) => {
                    event.preventDefault()
                    handleMoreUuids()
                }} >More books
            </Badge>
        </Col >
    }


    return (

        <Container style={{ marginBottom: 50 }}>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9" style={{ marginTop: 20 }}>

                    <h1 style={{ fontWeight: 200 }}>Your bookmarks <i class="twa twa-bookmark"></i></h1>

                    <hr />
                    {/* 
                    <Col lg={{ size: "6", offset: 3 }} style={{ marginTop: 20, marginBottom: 10 }}>
                        <Alert severity="warning" style={{ fontSize: 18 }}>Experimental feature.</Alert>


                    </Col> */}


                    <Row>
                        {resultsLoadStatus === false ?

                            <p>not loaded</p> :

                            queryList.map((queries, queriesIndex) => {
                                return queries.map((query, queryIndex) => {


                                    if (queryIndex === 0) {
                                        // if only query, then print along with uuid, query and show more
                                        return <Col xs={12} style={{ marginTop: 20 }}>

                                            {uuidElement(uuidList, queriesIndex)}

                                            {queryElement(username, uuidList, queriesIndex, query)}

                                        </Col>

                                    } else if (queryIndex === queries.length - 1 && queriesIndex === queryList.length - 1) {
                                        // if last query and last uuidd
                                        return <Col xs={12}>

                                            {queryElement(username, uuidList, queriesIndex, query)}

                                            {queryLast[queriesIndex] ? null : <Col xs={12}>{moreQueriesElement(uuidList, queriesIndex, queryIndex)}</Col>}

                                            <hr />



                                        </Col>


                                    } else if (queryIndex === queries.length - 1) {
                                        // last query 
                                        return <Col xs={12}>

                                            {queryElement(username, uuidList, queriesIndex, query)}



                                            {queryLast[queriesIndex] ? null : <Col xs={12}>{moreQueriesElement(uuidList, queriesIndex, queryIndex)}</Col>}

                                        </Col>


                                    } else {
                                        // arbitary query, so just display it

                                        return <Col xs={12}>{queryElement(username, uuidList, queriesIndex, query)} </Col>
                                    }

                                })


                            })
                        }

                        {uuidLast ? null : moreUuidsElement()}

                    </Row>

                    <br />



                </Col>


            </Row>
        </Container>
    );
}

export default withAuth(session => session && session.getCurrentUser)(Bookmark);