import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { SearchContext } from './SearchContextMangement';

import SnippetLoader from '../../Loaders/SnippetLoader'





import { Container, Row, Col } from 'reactstrap';



const TopQuestions = ({ uuid }) => {


    let topQuestionsEndPoint = process.env.REACT_APP_REDIS_API_ENDPOINT+'/top/questions/'



    const state = useContext(SearchContext);

    ////console.log(state.search, ": value from search box landing 😁 ")
    ////console.log(state.sessionId, ": sessionID is 😛")
    const [topQuestions, setTopQuestions] = useState([])
    const [textLoading, setTextLoading] = useState(true);



    const [prevResponseLen, setPrevResponseLen] = useState(0);
    // const [bookmarkStatus, setBookMarkStatus] = useState([0]);

    // ////console.log(pdfText, "in imp lines hehehehe")



    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json',

        }
    }

    useEffect(() => {
        setTextLoading(true)
        axios.get(
            topQuestionsEndPoint + uuid,
            axiosConfig
        )
            .then(res => {


                //console.log(res.data)
                setTopQuestions(res.data)
                setTextLoading(false)

                return res
            })

    }, [])




    var ContentPlaceholder = [1, 2];


    return (

        <Container className="top-key-words-container">

            <Row className="important-lines-header">
                <span >
                    Most asked questions
                </span>


            </Row>



            <hr />

            {textLoading ? ContentPlaceholder.map(idx => (
                <SnippetLoader key={Math.random()} />
            ))

                :

                topQuestions.map((item) => <p className={"question-asked-no-times"} onClick={() => {
                    state.setSearch(item['query'])
               
                }} > {item['query']} <span style={{opacity:0.7, fontSize:14}} >asked</span> <i>{item['score']} times</i></p>


                )



            }



            <div style={{ PaddingBottom: 30 }}>
                <hr />
            </div>


        </Container>
    );
}

export default TopQuestions;
