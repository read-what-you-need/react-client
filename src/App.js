import React, { useState, Fragment } from 'react';

import { useHistory } from 'react-router-dom'


import TopDocumentsTable from './components/TopDocumentsTable';
import TopDocumentsTableDynamic from './components/TopDocumentsTableDynamic';
import UploadButton from './components/Read/UploadButton';

import TestNav from './TestNav'

import { Tweet } from "react-twitter-widgets";

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import { useEffect } from 'react';




import { makeStyles } from '@material-ui/core/styles';


// https://github.com/ndresx/react-countdown
// import Countdown from 'react-countdown';



const App = ({ session }) => {

  const history = useHistory();




  console.log('from app page', session)

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


            <p className="main-page-try-before" >Try the AI in action</p>



            <hr className="break-80" />

            <Row className="main-page-examples" style={{ marginBottom: 50 }}>

              <Col xs={12} md={4}>
                <Paper elevation={5} onClick={() => {


                }}>

                  <div style={{

                    height: 300,



                    backgroundImage: `url(${"static/img/think.jpg"})`,

                    backgroundSize: 'cover',

                    backgroundRepeat: 'no-repeat',

                    borderRadius: 10


                  }

                  }>

                  </div>
                </Paper>
              </Col>


              <Col xs={12} md={4}>
                <Paper elevation={5} onClick={() => {


                }}>

                  <div style={{

                    height: 300,


                    backgroundImage: `url(${"static/img/nava.jpg"})`,

                    backgroundSize: 'cover',

                    backgroundRepeat: 'no-repeat',

                    borderRadius: 32


                  }

                  }>

                  </div>
                </Paper>

              </Col>


              <Col xs={12} md={4}>

                <Paper elevation={5} onClick={() => {

                }}>

                  <div style={{

                    height: 300,



                    backgroundImage: `url(${"static/img/benj.jpg"})`,

                    backgroundSize: 'cover',

                    backgroundRepeat: 'no-repeat',

                    backgroundPosition: 'center',

                    borderRadius: 10


                  }

                  }>

                  </div>
                </Paper>



              </Col>



            </Row>



            <Row style={{ marginBottom: 50 }}>

              <Col>

                <p className="main-page-try-before">Popular books</p>

                <hr className="break-80" />

                <Col xs={{ size: 6, offset: 3 }}> <TestNav /> </Col>

              </Col>


            </Row>


            <Row>





              <Col >

                <p className="main-page-try-before" >What friends are saying</p>

                <Tweet tweetId="1331654590052397079" options={{ width: "1400", conversations: null }} />


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

              <Link to={'/about/'} style={{ textDecoration: 'none', color: 'grey', fontSize: 20 }} >

                About

                </Link>





              <br />


              <a target="blank"

                style={{ textDecoration: 'none', color: 'grey', fontSize: 20 }}

                href="https://forms.gle/ZE73f4cdWVMmwkPy8">Feedback</a>

              <br />


              <Link to={'/faq/'} style={{ textDecoration: 'none', color: 'grey', fontSize: 20 }} >

                FAQs

              </Link>

              <br />

              <Link to={'/contact/'} style={{ textDecoration: 'none', color: 'grey', fontSize: 20 }} >

                Contact

              </Link>


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


