import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'


import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';



import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';


/** 
  - generate uuid on upload button click
  - create a mongo document
    - id is uuid
    - file name
    - user
    - upload time
    - processed: false
  - call ironbox1
    - send text file, uuid
**/



const UploadButton = () => {

    let pdfToTextEndPoint = "http://localhost:8890"



    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfText, setPdfText] = useState('');

    const [textLoading, setTextLoading] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [fileSize, setFileSize] = useState(null)


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


    const onChangeHandler = event => {

        //console.log(event.target.files[0])

        setSelectedFile(event.target.files[0])
        setFileSize(Math.floor(event.target.files[0].size / 1000000))
        setFileName(event.target.files[0].name.replace('.pdf', ''))

    }



    useEffect(() => {

        if (textLoading === false) {
            history.push(`/read/` + uuidv4(), { pdfText, fileName })
        }

    }, [textLoading]);



    let axiosConfig = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }


    let axiosPayload = {

        "pdf": selectedFile

    }

    const classes = useStyles();

    const history = useHistory();


    return (

        <Container>
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

            { fileSize > 50 && <span className="upload-limit-notice">please upload a file with a size smaller than 50 MB</span>}

            <div>
                {
                    selectedFile && fileSize <= 50 &&

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
        </Container>


    );
}


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));



export default UploadButton;