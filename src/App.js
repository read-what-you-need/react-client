import React, { useState, Fragment } from 'react';


import { useHistory } from 'react-router-dom'

import TopDocumentsTable from './components/TopDocumentsTable';
import UploadButton from './components/Read/UploadButton';




import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import { useEffect } from 'react';




import { makeStyles } from '@material-ui/core/styles';


// https://github.com/ndresx/react-countdown
import Countdown from 'react-countdown';

import Naval_File from './components/Read/txt/naval.txt'
import Benjamin_File from './components/Read/txt/benjamin.txt'
import Allen_File from './components/Read/txt/think.txt'

const App = ({ session }) => {

  const history = useHistory();




  console.log('from app page', session)

  const [selectedFile, setSelectedFile] = useState(null);


  const classes = useStyles();
  const [openLoaderModal, setOpenLoaderModal] = React.useState(false);






  return (


    <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>

      <Row>

        <Col md="2">



        </Col>


        <Col md="8">

          <Container className="App">

            <h1 className="Main-header">Read what you need </h1>


            {session && session.getCurrentUser ? null : 
            
            <p className="instruction-below-header-main-page"><Link to="/login" > Login </Link> in to try with your own files</p>}


            <p className="main-page-try-before">Try the AI in action</p>



            <hr className="break-80" />

            <Row className="main-page-examples" style={{ marginBottom: 50 }}>

              <Col xs={12} md={4}>
                <Paper elevation={5} onClick={() => {

                  fetch(Allen_File)
                    .then(r => r.text())
                    .then(text => {

                      const pdfText = text;
                      const fileName = "As A Man Thinketh";
                      history.push(`/read/think`, { pdfText, fileName })
                    });

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

                  fetch(Naval_File)
                    .then(r => r.text())
                    .then(text => {

                      const pdfText = text;
                      const fileName = "Almanack of Naval Ravikant";
                      history.push(`/read/naval`, { pdfText, fileName })
                    });

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

                  fetch(Benjamin_File)
                    .then(r => r.text())
                    .then(text => {

                      const pdfText = text;
                      const fileName = "The Autobiography of Benjamin Franklin";
                      history.push(`/read/benj`, { pdfText, fileName })
                    });

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

                <p className="main-page-try-before">Popular uploads</p>

                <hr className="break-80" />

                <TopDocumentsTable />

              </Col>


            </Row>


            {/* <Row>

              <Col>

                <p className="main-page-try-before" >What friends are saying</p>

                <hr className="break-80" />

                <a target="blank" href="https://twitter.com/jackbutcher/status/1331654590052397079">
                  <div style={{

                    height: '60%',



                    marginLeft: '5%',

                    marginBottom: 50,

                    backgroundImage: `url(${"static/img/jack.png"})`,



                    backgroundRepeat: 'no-repeat',

                    backgroundSize: 'contain',


                    borderRadius: 10


                  }

                  }>

                  </div>
                </a>






              </Col>


            </Row> */}




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


        </Col>

        <Col md="2">

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


