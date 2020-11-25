import React, { useContext } from 'react';



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

    var score = parseFloat(score)
    // //console.log(score)
    var IntScore = Math.floor(score * 100)

    return (
        <Row style={{ marginBottom: 20 }}>

            <Col xs={12}>
                <p className="prediction-content">
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