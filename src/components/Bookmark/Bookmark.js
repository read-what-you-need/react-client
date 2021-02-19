import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { Container, Row, Col } from 'reactstrap';


import withAuth from './../withAuth';

const Bookmark = ({ session }) => {

    const [booksList, setBooksList] = useState([])
    const [queryList, setQueryList] = useState([])
    const [linesList, setLinesList] = useState([])

    let bookmarkedFilesPoint = 'http://127.0.0.1:4444/api/v2/bookmarks'

    const token = localStorage.getItem('token');

    const username = session.getCurrentUser.username



    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json',
            'authorization': token
        }
    }


    useEffect(() => {


        setUp()

    }, [])

    const setUp = async () => {
        
        axios.get(
            bookmarkedFilesPoint,
            axiosConfig
        )
            .then(res => { setBooksList(res.data); return res.data })
            .then(res => { /* list of uuids */  return res[0] })
            .then(uuid => {
                /* get query id */
                return axios.get(bookmarkedFilesPoint + '/' + uuid, axiosConfig).then(queryIdData => { return [uuid, queryIdData.data[0]] })
                
            })
            .then(uuidAndQuery=> {
                /* get line id */
            
                return axios.get(bookmarkedFilesPoint + '/' + uuidAndQuery[0] + '/' + uuidAndQuery[1], axiosConfig)

            }).then(res => {
                /* line id present here */
                console.log(res.data)
            })

    }




    console.log(booksList, typeof (booksList))
    console.log(queryList)

    console.log(linesList)
    return (

        <Container>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9" style={{marginTop: 20}}>

                    <h4>welcome to your bookmarks!</h4>
                    <h4>{username}</h4>

                    <hr />

                    {/* {
                        queryList.map((queries, queriesIndex) => {
                            return queries.data.map((query, queryIndex) => {
                                if (queryIndex === 0) {
                                    return <div> <h4>{booksList[queriesIndex]}</h4><p>{query}</p></div>
                                } else if (queriesIndex === queries.length) {
                                    return <div><p>{query}</p><hr /></div>
                                } else {
                                    return <div><p>{query}</p></div>
                                }
                            }
                            )
                        })
                    } */}

                    <br />



                </Col>


            </Row>
        </Container>
    );
}

export default withAuth(session => session && session.getCurrentUser)(Bookmark);