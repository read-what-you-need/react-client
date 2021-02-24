import React, { useState, useContext, useEffect, Fragment } from 'react';
import axios from 'axios';

import { SearchContext } from './SearchContextMangement';
import { DiscoverContext } from './DiscoverContextManagement';

import FlatView from './TopWordsView/FlatView';
import TableView from './TopWordsView/TableView';

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


import { Container, Row, Col } from 'reactstrap';

import KeyWordLoader from '../../Loaders/KeyWordLoader';
import Button from '@material-ui/core/Button';



import YourLogo from './../../shuffle.svg'

import { makeStyles } from '@material-ui/core/styles';




const TopWords = ({ uuid, query }) => {

    let topWordsDataEndPoint = 'http://localhost:4444/api/v2/topWords/'+ uuid
    
    const state = useContext(SearchContext);
    const discoverState = useContext(DiscoverContext);

    const [randomWordsSegment, setRandomWordsSegment] = useState();
    const [randomWords, setRandomWords] = useState();
    const [randomButtonClick, setRandomButtonClick] = useState(false);

    const [showCount, SetShowCount] = useState(2)

    const [topN, setTopN] = useState([])
    const [textLoading, setTextLoading] = useState(null);




    useEffect(() => {

        setTextLoading(true);

        // redis cache implement here
        fetch(topWordsDataEndPoint)
            .then(res => {
                console.log(res, res.data)
                return res.json()
            })
            .then(data => {
           

                setTopN(data)
                setTextLoading(false)

                var firstTopWord = Object.entries(data)[0][0];

                if (state.search === ''){
                    // search state is empty set it to top word one
                    // it means set search has been mutated by query string passed from url
                    // and that query is being used for showing important lines
                    state.setSearch(firstTopWord);
                }

                


                setRandomWordsSegment(WordsSegment(data));

            

            })
            .catch(error => {
                console.error(error + ' in fetching data topNwords.json file');
            });


    }, []);

    const classes = useStyles();


    var chipPlaceholder = [1, 2, 3, 4];

    return (

        <Container className="top-key-words-container">

            <div className="top-words-header">
                <span style={{ marginRight: 20 }} onClick={() => {

                }}>Top keywords</span>



                <IconButton onClick={() => {
                    var resp = getRandomTopWords(randomWordsSegment[0], randomWordsSegment[1], randomWordsSegment[2])
                    setRandomWords(resp)
                    setRandomButtonClick(true)
                }}>
                    <img className="shuffle-icon-top-words" src={YourLogo} />

                </IconButton>




            </div>


            {!randomButtonClick && <Row style={{ justifyContent: "space-evenly" }}>

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
                                        SetShowCount(showCount + 10)
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


            </Row>}

            {randomButtonClick && <Row style={{ justifyContent: "space-evenly" }}>

                {showCount <= 2 ? textLoading ? chipPlaceholder.map(idx => (

                    <KeyWordLoader key={Math.random()} />

                )) : <Fragment>

                        <FlatView topN={randomWords} />

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
                                        SetShowCount(showCount + 10)
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


            </Row>}




        </Container>
    );
}

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

function SliceObject(obj, start, end) {
    let slicedObj = []
    Object.entries(obj).slice(start, end).map(([key, value], i) => slicedObj.push([key, value]));
    return slicedObj;
}

function WordsSegment(data) {
    let lenTopN = Object.entries(data).length

    // get len of the first 30% segment of top N words object
    let totalSegmentLen = Math.floor(lenTopN * 0.3)

    // top words segment contains first 30% items from top N words object
    var slicedTopN = SliceObject(data, 0, totalSegmentLen)

    const segment = slicedTopN;
    const segmentLen = segment.length;



    // the point at which segment cuts are to be made
    const segmentInterval = [20, 50, 30]

    //       20           20+50=70      100
    //        |                 |        |
    //        |                 |        |
    //        |                 |        |
    //        ⬇️                 ⬇️        ⬇️
    // [===================================]

    var firstMarker = Math.floor(segmentLen * segmentInterval[0] * 0.01)
    var secondMarker = Math.floor(segmentLen * segmentInterval[1] * 0.01) + firstMarker



    const firstSegment = segment.slice(0, firstMarker)
    const secondSegment = segment.slice(firstMarker, secondMarker)
    const thirdSegment = segment.slice(secondMarker, -1)

    return [firstSegment, secondSegment, thirdSegment]
}


function getRandomTopWords(firstSegment, secondSegment, thirdSegment) {

    const firstTopWord = getRandom(firstSegment)
    const secondTopWord = getRandom(secondSegment)
    const thirdTopWord = getRandom(thirdSegment)

    //console.log(firstTopWord, secondTopWord, thirdTopWord)

    return [firstTopWord, secondTopWord, thirdTopWord]
}


function getRandom(list) {
    return list[Math.floor((Math.random() * list.length))];
}



export default TopWords;

