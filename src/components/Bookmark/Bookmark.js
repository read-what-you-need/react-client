import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';


import withAuth from './../withAuth';

const Bookmark = ({ session }) => {

    let bookmarkedFilesPoint = 'http://127.0.0.1:4444/api/v2/bookmarks'
    let bookmarkedMoreQueries = 'http://127.0.0.1:4444/api/v2/bookmarks'

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
                    console.log('empty uuid list')
                    setUuidLast(true)
                }


                return res
            }).then(res => setResultsLoadStatus(true))

    }, [start])

    console.log(queryLast)


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



    return (

        <Container>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9" style={{ marginTop: 20 }}>

                    <h4>welcome to your bookmarks!</h4>
                    <h4>{username}</h4>

                    <hr />

                    {resultsLoadStatus === false ?

                        <p>not loaded</p> :

                        queryList.map((queries, queriesIndex) => {
                            return queries.map((query, queryIndex) => {



                                if (queryIndex === 0) {
                                    // if only query, then print along with uuid, query and show more
                                    return <div> <h4>{uuidList[queriesIndex]['name']}</h4><hr /> <Link target={'blank'} to={'/bookmarks/' + username + '/' + uuidList[queriesIndex]['uuid'] + '/' + query['id']} >  {query['query']}    </Link></div>
                                } else if (queryIndex === 0) {
                                    // if only query, then print along with uuid, query and show more
                                    return <div> <h4>{uuidList[queriesIndex]['name']}</h4><hr /> <Link target={'blank'} to={'/bookmarks/' + username + '/' + uuidList[queriesIndex]['uuid'] + '/' + query['id']} >  {query['query']}    </Link></div>
                                } else if (queryIndex === queries.length - 1 && queriesIndex === queryList.length - 1) {
                                    // if last query and last uuidd
                                    return <div><Link target={'blank'} to={'/bookmarks/' + username + '/' + uuidList[queriesIndex]['uuid'] + '/' + query['id']} >  {query['query']}
                                    </Link>

                                        {queryLast[queriesIndex] ? null : <p onClick={() => { handleMoreQueries(uuidList[queriesIndex]['uuid'], queriesIndex, queryIndex) }} >More queries</p>}

                                        {uuidLast ? null : <p onClick={handleMoreUuids} >More UUIDS</p>}</div>


                                } else if (queryIndex === queries.length - 1) {
                                    return <div><Link target={'blank'} to={'/bookmarks/' + username + '/' + uuidList[queriesIndex]['uuid'] + '/' + query['id']} >  {query['query']}    </Link>

                                        {queryLast[queriesIndex] ? null : <p onClick={() => { handleMoreQueries(uuidList[queriesIndex]['uuid'], queriesIndex, queryIndex) }} >More queries</p>}</div>


                                } else {
                                    // arbitary query, so just display it

                                    return <div><Link target={'blank'} to={'/bookmarks/' + username + '/' + uuidList[queriesIndex]['uuid'] + '/' + query['id']} >  {query['query']}    </Link></div>
                                }

                            })


                        })
                    }



                    <br />



                </Col>


            </Row>
        </Container>
    );
}

export default withAuth(session => session && session.getCurrentUser)(Bookmark);