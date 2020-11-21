import React, { useState } from 'react';


import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import FileBase64 from './Base64'

import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { Container, Row, Col } from 'reactstrap';


import './App.css';
import { useEffect } from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';


import Naval_File from './components/Read/txt/naval.txt'
import Benjamin_File from './components/Read/txt/benjamin.txt'
import Allen_File from './components/Read/txt/think.txt'

const App = () => {

  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfText, setPdfText] = useState('');

  const [textLoading, setTextLoading] = useState(null);
  const [fileName, setFileName] = useState(null);




  // const getFiles = (files) => {

  //   console.log(uuidv4(), typeof (uuidv4()));

  //   var pdfByteString = files['base64'].slice(28)

  //   setSelectedFile(pdfByteString)

  //   console.log(pdfByteString)
  // }


  useEffect(() => {

    if (textLoading === false) {
      history.push(`/read/` + uuidv4(), { pdfText, fileName })
    }

  }, [textLoading]);


  const onChangeHandler = event => {
    console.log(event.target.files[0])

    setSelectedFile(event.target.files[0])
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

    console.log(data, 'clicked for upload')

    axios.post(
      "http://localhost:8890",
      data,
      axiosConfig

    )
      .then(res => {

        console.log(res.statusText, res.data, typeof (res.data))

        setPdfText(res.data)
        setTextLoading(false);

      }).catch(function (error) {
        console.log(error);
      });



  }

  const UploadIcon = () => (

    <div style={{ marginLeft: 10 }}>
      <img style={{ width: 32 }} src="static/img/upload.png" alt="upload" />
    </div>

  )


  const classes = useStyles();
  const [openLoaderModal, setOpenLoaderModal] = React.useState(false);



  return (


    <div className="App">

      <h1 className="Main-header">Read what you need</h1>


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


      </div>

      <div>
        {
          selectedFile &&

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

      <hr style={{ width: '95%' }} />

      <Container className="main-page-examples" fluid style={{ marginBottom: 50 }}>

        <Row>
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

                height: 400,

                width: 250,

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

                height: 400,

                width: 250,

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

                height: 400,

                width: 250,

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


      </Container>



    </div>



  );
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));


export default App;


