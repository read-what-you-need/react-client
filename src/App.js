import React, { useState, Fragment } from 'react';


import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import FileBase64 from './Base64'

import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import { useEffect } from 'react';

import TopDocumentsTable  from './components/TopDocumentsTable';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

// https://github.com/ndresx/react-countdown
import Countdown from 'react-countdown';

import Naval_File from './components/Read/txt/naval.txt'
import Benjamin_File from './components/Read/txt/benjamin.txt'
import Allen_File from './components/Read/txt/think.txt'

const App = () => {

  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfText, setPdfText] = useState('');

  const [textLoading, setTextLoading] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null)

  const timeRemaining = Date.parse("Thu Dec 26 2020 05:09:04 GMT+0530 (India Standard Time)") - Date.now();
  console.log(typeof (timeRemaining))
  const [maintainenceStatus, setMaintainenceStatus] = useState(false)

  let pdfToTextEndPoint = "http://localhost:8890"



  // const getFiles = (files) => {

  //   //console.log(uuidv4(), typeof (uuidv4()));

  //   var pdfByteString = files['base64'].slice(28)

  //   setSelectedFile(pdfByteString)

  //   //console.log(pdfByteString)
  // }


  useEffect(() => {

    if (textLoading === false) {
      history.push(`/read/` + uuidv4(), { pdfText, fileName })
    }

  }, [textLoading]);


  const onChangeHandler = event => {

    //console.log(event.target.files[0])

    setSelectedFile(event.target.files[0])
    setFileSize(Math.floor(event.target.files[0].size / 1000000))
    setFileName(event.target.files[0].name.replace('.pdf', ''))

  }


  let axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }


  let axiosPayload = {

    "pdf": selectedFile

  }



  const onSubmitClickHandler = () => {

    setTextLoading(true);

    const data = new FormData()
    data.append('pdf-file', selectedFile)

    //console.log(data, 'clicked for upload')

    axios.post(
      pdfToTextEndPoint,
      data,
      axiosConfig

    )
      .then(res => {

        //console.log(res.statusText, res.data, typeof (res.data))

        setPdfText(res.data)
        setTextLoading(false);

      }).catch(function (error) {
        //console.log(error);
      });



  }

  const UploadIcon = () => (

    <div style={{ marginLeft: 10 }}>
      <img style={{ width: 32 }} src="static/img/upload.png" alt="upload" />
    </div>

  )


  const classes = useStyles();
  const [openLoaderModal, setOpenLoaderModal] = React.useState(false);

  const timerRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      setMaintainenceStatus(true)
      return <div></div>;
    } else {
      // Render a countdown
      return <div>
        <span>Live for the next </span>
        {hours === 0 ? null : <span>{hours} hours </span>}
        {minutes === 0 ? null : <span>{minutes} minutes </span>}
        {seconds === 0 ? null : <span>{seconds} seconds </span>}
      </div>;
    }


  };

  return (





    <Container fluid style={{ paddingRight: 0, paddingLeft: 0 }}>

      <Row>

        <Col md="2">

          < div class="sidebar" >

            <Link to="/" >   Home       </Link>
            
            <Link to="/login" >   Login       </Link>

            <a target="blank" href="https://forms.gle/ZE73f4cdWVMmwkPy8">Feedback</a>

            <Link to="/faq" >   FAQ's       </Link>

          </div >

        </Col>


        <Col md="8">

          {!maintainenceStatus && <Container className="App">

            <h1 className="Main-header">Read what you need </h1>

            {/* To get the next nth hour time */}
            {/* https://stackoverflow.com/a/1051641 */}
            {/* <div className="sub-header-timer">
              <Countdown
                date={1607017898000}
                renderer={timerRenderer}
              />
            </div> */}






            <div className="btn-grad-container" >


              <Button variant="contained" component="label" endIcon={<UploadIcon />}>
                Upload PDF File
          <input
                  accept=".pdf"
                  type="file"
                  onChange={onChangeHandler}

                  style={{ display: "none" }}
                />

              </Button>
              <br />
              {!selectedFile && <span className="upload-limit-notice">*max upload file size 12 MB</span>}
              <br />


            </div>

            {fileSize > 12 && <span className="upload-limit-notice">please upload a file with a size smaller than 12 MB</span>}

            <div>
              {
                selectedFile && fileSize <= 12 &&

                <Button style={{ marginTop: 20 }} variant="contained" component="label"
                  onClick={onSubmitClickHandler}

                >
                  Submit
        </Button>

              }

              <Backdrop className={classes.backdrop} open={textLoading} >
                <CircularProgress color="inherit" />
              </Backdrop>




            </div>




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

                <p className="main-page-try-before">Popular documents</p>

                <hr className="break-80" />
                
                    <TopDocumentsTable />

              </Col>


            </Row>


            {/* <Row>

              <Col>

                <p className="main-page-try-before" >Review</p>

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

          }

          {maintainenceStatus && <div className="App">

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

          </div>
          }

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


