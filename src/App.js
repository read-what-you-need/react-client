import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom'


import TestNav from './TestNav'


import ExampleBooks from './components/Read/ExampleBooks';
import BooksList from './components/BooksList';

import { Player, BigPlayButton } from 'video-react';
import { Tweet } from "react-twitter-widgets";

import { makeStyles } from '@material-ui/core/styles';

import { Container, Row, Col } from 'reactstrap';
import Button from '@material-ui/core/Button';

import './App.css';


// https://github.com/ndresx/react-countdown
// import Countdown from 'react-countdown';



const App = ({ session }) => {

  const history = useHistory();




  //console.log('from app page', session)

  const [selectedFile, setSelectedFile] = useState(null);


  const classes = useStyles();
  const [openLoaderModal, setOpenLoaderModal] = React.useState(false);






  return (


    <Container style={{ paddingRight: 0, paddingLeft: 0 }}>

      <Row>

        <Col md="2">



        </Col>


        <Col md="9">

          <Container className="App">

            <Row className="main-header-with-logo">
              <Col xs={12} lg={1}>
                <img src={"/static/img/logo.png"} className="logo-resize" alt="My logo" />

              </Col>
              <Col xs={12} lg={11}>
                <h1 className="Main-header">Read what you need </h1>

              </Col>

            </Row>

            <h2 className="sub-header-main-page"><span className="mark">Find interesting content </span> from your books easily</h2>

            {session && session.getCurrentUser ? null :

              <p className="instruction-below-header-main-page"><Link to="/login" > Login </Link> in to try with your own files</p>}



            <Player
              playsInline
              poster="/static/img/benj.jpg"
              src="https://readneedobjects.s3.ap-south-1.amazonaws.com/rwunv02_2.mp4"
            ><BigPlayButton position="center" /></Player>

            <p className="main-page-try-before" >Try the AI in action</p>



            <hr className="break-80" />

            <ExampleBooks/>

            <Row style={{ marginBottom: 50 }}>

              <Col>

                <p className="main-page-try-before">Popular books</p>

                <hr className="break-80" />

                <Col xs={{ size: 12 }} lg={{ size: 6, offset: 3 }}> <BooksList /> </Col>

              </Col>


            </Row>


            <Row>





              <Col >

                <p className="main-page-try-before" >What friends are saying</p>

                <Tweet tweetId="1331654590052397079" options={{ width: "1400", conversations: null }} />


              </Col>


              <Col >

                <p className="main-page-try-before" >Believe in the idea? </p>

                <div className="btn-grad-container-journey" >

                  <a style={{ textDecoration: 'none'}} target="blank" href="http://forms.gle/3kC9Rz6piAHptxS6A">
                    <Button variant="contained" component="label" >
                    Connect with us!
                </Button>
                  </a>

                </div>


              </Col>



            </Row>





          </Container>


          {/* The below snippet can be used if the site is down, for any reason */}

          {/* 
        
        <div className="App">

          <h1 className="Main-header">Read what you need</h1>

          <h1 className="sub-header">Thank you for your interest. <i class="twa twa-slightly-smiling-face"></i></h1>

          <h1 className="sub-header" >The site is currently down for maintainence <i class="twa twa-hammer-and-wrench"></i></h1>

          <Col >

            <h1 className="sub-header">If you want to know when the site will be live next time.</h1>

            <div className="btn-grad-container-journey" >



              <a style={{ textDecoration: 'none' }} target="blank" href="http://forms.gle/3kC9Rz6piAHptxS6A">
                <Button variant="contained" component="label" >
                  Update me!
                </Button>
              </a>

            </div>


          </Col>

        </div> */}

          <Container fluid className="footer">

            <p className="main-page-try-before" >More</p>
            <hr />

            <Col md={{ size: 6, offset: 1 }} xs={{ size: 6, offset: 1 }}>

              {/* <Link to={'/about/'} style={{ textDecoration: 'none', color: 'grey', fontSize: 20 }} >

                About

                </Link>





              <br /> */}


              <a target="blank"

                style={{ textDecoration: 'none', color: 'grey', fontSize: 20 }}

                href="https://forms.gle/ZE73f4cdWVMmwkPy8">Feedback</a>

              <br />


              <Link to={'/faq/'} style={{ textDecoration: 'none', color: 'grey', fontSize: 20 }} >

                FAQs

              </Link>

              <br />

  


            </Col>




          </Container>


        </Col>



      </Row>



    </Container>


  );
}


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default App;


