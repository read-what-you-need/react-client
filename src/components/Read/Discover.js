import React, { useState, useContext, useEffect, Fragment } from 'react';
import axios from 'axios';

import { DiscoverContext } from './DiscoverContextManagement';


import FlatView from './TopWordsView/FlatView';
import TableView from './TopWordsView/TableView';

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

import { Container, Row, Col } from 'reactstrap';

import KeyWordLoader from '../../Loaders/KeyWordLoader';

import Avatar from '@material-ui/core/Avatar';

import { SearchContext } from './SearchContextMangement';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        marginRight: 20,
        marginBottom: 30,
        marginTop: 15,

    },
    label: {
        fontSize: 18,
        fontWeight: 400,
        fontStyle: 'italic'
    },
});



const Discover = ({ pdfText }) => {

    //console.log(pdfText)



    const discoverState = useContext(DiscoverContext);
    const state = useContext(SearchContext);



    
    // const firstTopWord = getRandom(discoverState.topWordsSegment[0])
    // const secondTopWord = getRandom(discoverState.topWordsSegment[1])
    // const thirdTopWord = getRandom(discoverState.topWordsSegment[2])

    console.log(discoverState.topWordsSegment[0])

    // function getRandomTopWords() {
    //     console.log(firstSegment)

    
    //     console.log(firstTopWord[0], typeof (firstTopWord))


    //     return [firstTopWord[0], secondTopWord[0], thirdTopWord[0]]
    // }

    //var a = getRandomTopWords()
    //console.log(a)




    let axiosConfig = {

        headers: {

            'Content-Type': 'application/json'

        }
    }




    const axiosPayload = (searchFor) => {

        return {
            "corpus": pdfText, "text": searchFor, "top": 5,

            "sessionId": state.sessionId, "accuracyGreaterThan": 0.2
        }

    }

    // 200,000
    // 5000


    // useEffect(() => {

    //     setTextLoading(true);



    //     axios.post(
    //         "http://localhost:8891",
    //         axiosPayload('happy'),
    //         axiosConfig
    //     )
    //         .then(res => {

    //             console.log(res.statusText, res.data)

    //             let chosenLine = getRandom(Object.entries(res.data))[0]
    //             discoverState.setTopMatchingLines(chosenLine)

    //             setTextLoading(false);

    //         }).catch(function (error) {
    //             console.log(error);
    //         });



    // }, [state.search]);

    const [showCount, SetShowCount] = useState(2)

    const [topN, setTopN] = useState([])
    const [textLoading, setTextLoading] = useState(null);


    const classes = useStyles();

    const handleShowLessButton = () => {

    }

    var chipPlaceholder = [1, 2, 3, 4];

    return (

        <Container className="top-key-words-container">

            <div className="top-words-header">
                <span style={{ marginRight: 20 }} onClick={() => {

                }}>Top keywords</span>

                {/* <span> | </span>

                <span style={{ marginLeft: 20 }} onClick={()=>{
                    SetSelection('questionsSug')
                }}>Questions</span> */}
            </div>


            <Row style={{ justifyContent: "space-evenly" }}>

                {showCount <= 2 ? textLoading ? chipPlaceholder.map(idx => (

                    <KeyWordLoader key={Math.random()} />

                )) : <Fragment>

                        <FlatView topN={SliceObject(topN, 0, 3)} />

                        <Chip
                            key={Math.random()}
                            // avatar={<Avatar>{value}</Avatar>}

                            onClick={(e) => {
                                e.preventDefault();
                                SetShowCount(showCount + 10)
                            }}

                            classes={{
                                root: classes.root,
                                label: classes.label,
                            }}

                            label="more" />



                    </Fragment> : textLoading ? chipPlaceholder.map(idx => (

                        <KeyWordLoader key={Math.random()} />

                    )) : <Fragment>

                            <TableView topN={SliceObject(topN, 0, showCount)} />

                            <div className="keywords-more-less-box">
                                <Chip
                                    key={Math.random()}
                                    // avatar={<Avatar>{value}</Avatar>}

                                    onClick={(e) => {
                                        e.preventDefault();

                                        //getRandomTopWords()
                                    }}

                                    classes={{
                                        root: classes.root,
                                        label: classes.label,
                                    }}

                                    className="chip-center"

                                    label="more" />

                                <span class="keywords-show-less-button">

                                    <IconButton onClick={(e) => {
                                        SetShowCount(2)
                                    }}>
                                        <ExpandLessIcon />
                                    </IconButton>

                                </span>
                            </div>


                        </Fragment>}








            </Row>


        </Container>
    );
}


function SliceObject(obj, start, end) {
    let slicedObj = []
    Object.entries(obj).slice(start, end).map(([key, value], i) => slicedObj.push([key, value]));
    return slicedObj;
}

function getRandom(list) {
    return list[Math.floor((Math.random() * list.length))];
}


export default Discover;

