import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { Container, Row, Col } from 'reactstrap';


import withAuth from './../withAuth';

const Bookmark = ({ session }) => {

    const [uuidList, setUuidsList] = useState([])
    const [queryList, setQueryList] = useState([])
    const [linesList, setLinesList] = useState([])

    const [dict, setDict] = useState(false)

    let bookmarkedFilesPoint = 'http://127.0.0.1:4444/api/v2/bookmarks'

    const token = localStorage.getItem('token');

    const username = session.getCurrentUser.username



    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json',
            'authorization': token
        }
    }
    let axiosPayload = {

        "start": 0,

        "end": 3

    }


    useEffect(() => {
        axios.post(
            bookmarkedFilesPoint,
            axiosConfig
        )
            .then(res => {


                setUuidsList(res.data['uuids'])
                setQueryList(res.data['queries'])
                setLinesList(res.data['lines'])

                return res
            }).then(res => setDict(true))

    }, [])

    console.log(uuidList)
    console.log(queryList)
    console.log(linesList)



    return (

        <Container>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9" style={{ marginTop: 20 }}>

                    <h4>welcome to your bookmarks!</h4>
                    <h4>{username}</h4>

                    <hr />

                    {dict === false ?

                        <p>not loaded</p> :

                        queryList.map((queries, queriesIndex) => {
                            return queries.map((query, queryIndex) => {

                                return linesList[queriesIndex][queryIndex].map((line, lineIndex) => {

                                    if (queryIndex === 0 && lineIndex === 0) {
                                        // query index and line index zero means under a new uuid
                                        if (queriesIndex === queryList.length - 1 &&
                                            queryIndex === queries.length - 1 &&
                                            lineIndex === linesList[queriesIndex][queryIndex].length - 1
                                        ) {
                                            return <div> <h4>{uuidList[queriesIndex]}</h4><hr /> <p>{query}</p><p>{line}</p><h1>More</h1></div>
                                        } else
                                            return <div> <h4>{uuidList[queriesIndex]}</h4><hr /> <p>{query}</p><p>{line}</p></div>
                                    } else if (lineIndex === 0) {
                                        // line index zero means under a new query
                                        if (queriesIndex === queryList.length - 1 &&
                                            queryIndex === queries.length - 1 &&
                                            lineIndex === linesList[queriesIndex][queryIndex].length - 1
                                        ) {
                                            return <div> <p>{query}</p><p>{line}</p><h1>More</h1></div>
                                        } else
                                            return <div><p>{query}</p><p>{line}</p></div>
                                    } else if (queriesIndex === queryList.length - 1 &&
                                        queryIndex === queries.length - 1 &&
                                        lineIndex === linesList[queriesIndex][queryIndex].length - 1
                                    ) {
                                        return <div><p>{line}</p><h1>More</h1></div>
                                    } else {
                                        // arbitary line, so just display it

                                        return <div><p>{line}</p></div>
                                    }

                                })

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