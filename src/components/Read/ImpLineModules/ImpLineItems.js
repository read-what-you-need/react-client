import React, { useContext, useState } from 'react';

import axios from 'axios';

import { SearchContext } from './../SearchContextMangement';


import { Container, Row, Col } from 'reactstrap';

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import { Icon } from '@material-ui/core';

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";



import { useMutation, useQuery } from "@apollo/react-hooks";

import {
    SET_BOOKMARK, REMOVE_BOOKMARK
} from '../../../queries';







const ImpLineItems = ({ session, uuid, content, score, itemNo, bookmarkFlag }) => {

    let getQuestionEndPoint = "http://localhost:4444/api/v2/set/textToQuestion"


    // //console.log(content)
    const state = useContext(SearchContext);

    const [questionLoading, setQuestionLoading] = useState(null);
    const [bookMarkStatus, setBookMarkReact] = useState(bookmarkFlag == 1 ? true : false);

    const [userLoginStatus, setUserLoginStatus] = useState(session.getCurrentUser ? true : false)


    var score = parseFloat(score)
    // //console.log(score)
    var IntScore = Math.floor(score * 100)

    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json'

        }
    }

    let axiosPayload = {

        "text": content


    }

    console.log('search query present:', state.search)

    const handleGetQuestionRequest = () => {
        console.log(content)

        setQuestionLoading(true)

        axios.post(
            getQuestionEndPoint,
            axiosPayload,
            axiosConfig
        )
            .then(res => {
                setQuestionLoading(false)
                console.log(res.data)
    
                var question = res.data
    
                state.setSearch(question);
    
            }).catch(function (error) {
                console.log(error);
            });
    
        
    }


    const [setBookMark,
        { data: bookmarkMutatedata,
            loading: bookmarkMutateLoading,
            error: bookmarkMutateError }] = useMutation(SET_BOOKMARK);

    const [removeBookMark,
        { data: bookmarkRemoveMutatedata,
            loading: bookmarkRemoveMutateLoading,
            error: bookmarkRemoveMutateError }] = useMutation(REMOVE_BOOKMARK);


    const handleBookmarkClick = () => {
        console.log('bokmark')

        setBookMarkReact(!bookMarkStatus)

        if (bookMarkStatus === true) {
            console.log('bookmark unset')
            // call delete bookmark

            removeBookMark({
                variables: {
                    uuid: uuid,
                    line: content,
                    query: state.search
                }
            }).catch(function (error) {
                console.log(error)
                throw new Error(error, ': in removing bookmark');
            });

        } else {
            console.log('bookmark ser')
            // call set bookmark

            setBookMark({
                variables: {
                    uuid: uuid,
                    line: content,
                    query: state.search
                }
            }).catch(function (error) {
                console.log(error)
                throw new Error(error, ': in setting bookmark');
            });


        }


    }



    const classes = useStyles();


    return (
        <Row className="match-line-box">

            <Col xs={11}>
                <p className="prediction-content"
                    onClick={handleGetQuestionRequest}>
                    <span style={{ color: 'darkgrey' }}>{itemNo + 1}. </span> {content}
                </p>
            </Col>

            {userLoginStatus && <Col xs={1} style={{ paddingLeft: 0, paddingRight: 0, paddingBottom: 5 }}>
                <IconButton onClick={handleBookmarkClick}>
                    {bookMarkStatus ?
                        <BookmarkIcon style={{ opacity: 0.5, color: 'green' }} /> :
                        <BookmarkBorderIcon style={{ opacity: 0.5 }} />}
                </IconButton>
            </Col>}

            <Col xs={12}>

                <Progress
                    theme={
                        {
                            error: {
                                symbol: IntScore + '🤕',
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
                    style={{ marginLeft: 10, marginRight: 20, width: '97.6%' }} percent={IntScore} status={getStatus(IntScore)} />
            </Col>

            <hr />

            <Backdrop className={classes.backdrop} open={questionLoading} >
                <CircularProgress color="inherit" />
            </Backdrop>


        </Row>


    );
}



const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    noPadding: {
        margin: '0',
    },
    padded: {
        margin: '12px 0',
    },
}));


function getStatus(percentage) {
    if (percentage > 74) {
        return "success"
    } else if (percentage > 56 && percentage < 75) {
        return "default"
    } else if (percentage < 57 && percentage > 43) {
        return "active"
    } else {
        return "error"
    }
}



export default ImpLineItems;
