import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import TopWords from './TopWords'
import ImpLines from './ImpLines'

import Discover from './Discover'


import { Container, Row, Col } from 'reactstrap';
import SmartSearch from './SmartSearch';
import { SearchContextProvider } from './SearchContextMangement';



const ReadHome = ({ location, match }) => {

    const _id = match.params._id;

    const { pdfText } = location.state

    const { fileName } = location.state



    // const splitText =  splitTextByNewline(pdfText)



    return (
        <Fragment>


            < div class="sidebar" >

                <Link to="/" >   Home       </Link>



            </div >

            <div className="App-read-page">


                {/* <h1 className="read-page-header">Read what you need</h1> */}
                <h1 className="read-page-file-name">{fileName}</h1>


                <SearchContextProvider sessionId={_id}>

                 

                        <SmartSearch />

                        <div style={{ height: 10 }}></div>

                        <TopWords pdfText={pdfText} />


                        <div style={{ height: 10 }}></div>

                        <ImpLines pdfText={pdfText} />

    
                </SearchContextProvider>

            </div>
        </Fragment>
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