import React from 'react';

import TopWords from './TopWords'
import ImpLines from './ImpLines'

import { Container, Row, Col } from 'reactstrap';
import SmartSearch from './SmartSearch';
import { SearchContextProvider } from './SearchContextMangement';

const ReadHome = ({ location, match }) => {

    const _id  = match.params._id;
    
    const { pdfText } = location.state

    
    // const splitText =  splitTextByNewline(pdfText)


    return (
        <div className="App">

            <h1 className="Main-header">Read what you need</h1>

            <SearchContextProvider sessionId={_id}>

                <SmartSearch />

                <TopWords pdfText={pdfText} />

                <ImpLines pdfText={pdfText} />

            </SearchContextProvider>

        </div>
    );
}

export default ReadHome;


function splitTextByNewline(text) {

    //text = text.replaceAll("\n", " ");
    text = text.replace(/\n/g, " ");
    var splits = text.split('. ')


    var paraArray = [];
    let prev = 0;

    var arrayLength = splits.length;
    for (var i = 0; i < arrayLength; i++) {

        if (i % 2 === 0) {
            paraArray.push("".concat(splits.slice(prev, i)))
            prev = i;
        }
    }



    var removeSmallStringsArray = [];
    var splicedArrayLength = paraArray.length;
    for (var i = 0; i < splicedArrayLength; i++) {
        if (paraArray[i].length >= 24) {
            removeSmallStringsArray.push(paraArray[i]);
        }
    }

    return removeSmallStringsArray

}