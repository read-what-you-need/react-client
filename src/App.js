import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import FileBase64 from './Base64'

import { useHistory } from 'react-router-dom'



import Button from '@material-ui/core/Button';

import './App.css';
import { useEffect } from 'react';
import Icon from '@material-ui/core/Icon';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const App = () => {

  const history = useHistory();

  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfText, setPdfText] = useState('');

  const [textLoading, setTextLoading] = useState(null);


  const getFiles = (files) => {

    console.log(uuidv4(), typeof(uuidv4()));

    var pdfByteString = files['base64'].slice(28)

    setSelectedFile(pdfByteString)

  }



  let axiosConfig = {
    headers: {
      'Content-Type': 'text/plain'
    }
  }



  useEffect(() => {

    if (textLoading === false) {
      history.push(`/read/`+uuidv4(), { pdfText })
    }

  }, [textLoading]);




  const onSubmitClickHandler = () => {

    setTextLoading(true);

    axios.post(
      "https://eebepu2tvj.execute-api.ap-south-1.amazonaws.com/python-lam",
      selectedFile,
      axiosConfig
    )
      .then(res => {

        // console.log(res.statusText, res.data)

        setPdfText(res.data['body'])
        setTextLoading(false);

      }).catch(function (error) {
        console.log(error);
      });



  }

  return (


    <div className="App">

      <h1 className="Main-header">Read what you need</h1>
      
      <div className="btn-grad" >

        <FileBase64

          multiple={false}
          onDone={getFiles} />


      </div>

      {
        selectedFile &&

        <Button style={{marginTop: 20}} variant="contained" component="label"
          onClick={onSubmitClickHandler}
          
        >
          Submit
          </Button>

      }

      {textLoading ? <p>Loading</p> : null}


    </div>



  );
}

export default App;


