import React, { useContext, useState } from 'react';

import axios from 'axios';

import { SearchContext } from './../SearchContextMangement';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import { Container, Row, Col } from 'reactstrap';


function getStatus(percentage) {
    if (percentage > 74) {
        return "success"
    } else if (percentage > 56 && percentage < 75) {
        return "default"
    } else if (percentage < 57 && percentage > 51) {
        return "active"
    } else {
        return "error"
    }
}



const ImpLineItems = ({ content, score, itemNo }) => {


    // //console.log(content)
    const state = useContext(SearchContext);

    const [questionLoading, setQuestionLoading] = useState(null);
    

    var score = parseFloat(score)
    // //console.log(score)
    var IntScore = Math.floor(score * 100)

    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json'

        }
    }

    let axiosPayload = {

        "context": content,
        "answer": ""

    }
    
    let questionGeneratorEndPoint = "http://localhost:8892"

    const handleGetQuestionRequest = () => {
        console.log(content)

                                setQuestionLoading('true')

                                axios.post(
                                    questionGeneratorEndPoint,
                                    axiosPayload,
                                    axiosConfig
                                )
                                    .then(res => {
                                        setQuestionLoading('false')
                                        console.log(res.data)

                                        var question = res.data['result'].slice(16,).slice(0, -4)
                                        // trimming the element padding in the beginning and the ending
                                        
                                        
                                        state.setSearch(question);
                        
                                    }).catch(function (error) {
                                        //console.log(error);
                                    });
    }

    return (
        <Row style={{ marginBottom: 20 }}>

            <Col xs={12}>
                <p className="prediction-content"   
                onClick={handleGetQuestionRequest}>
                    <span style={{ color: 'darkgrey' }}>{itemNo + 1}. </span> {content}
                </p>
            </Col>

            <Col xs={12}>

                <Progress
                    theme={
                        {
                            error: {
                                symbol: IntScore + '😱',
                                trailColor: 'pink',
                                color: 'red'
                            },
                            default: {
                                symbol: IntScore + '😊',
                                trailColor: 'lightblue',
                                color: 'blue'
                            },
                            active: {
                                symbol: IntScore + '😀',
                                trailColor: 'yellow',
                                color: 'orange'
                            },
                            success: {
                                symbol: IntScore + '🌟',
                                trailColor: 'lime',
                                color: 'green'
                            }
                        }
                    }
                    style={{ marginLeft: 10, marginRight: 20, width: '98%' }} percent={IntScore} status={getStatus(IntScore)} />
            </Col>

            <hr />

        </Row>

    );
}

export default ImpLineItems;