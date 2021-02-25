import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom'


import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid'



import { useMutation, useQuery } from "@apollo/react-hooks";

import {
    ADD_FILE,
} from '../../queries';




import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';


/** 
  - generate uuid on upload button click ✅
  - create a mongo document ✅
    - id is uuid 
    - file metdata
    - user
    - upload time
    - processed: false
  - map uuid with name for redis
  - call pdftotext ✅
    - get text file
  - show user files table ✅
  - call ironbox1 ✅
    - send text file, uuid
**/



const UploadButton = ({ session }) => {

    let pdfToTextEndPoint = "http://localhost:8891"
    let setUuidNameMappingPoint = 'http://localhost:4444/api/v2/set/uuidNameMap'

    let generateEmbeddingsEndPoint = ""

    const token = localStorage.getItem('token');


    const [selectedFile, setSelectedFile] = useState(null);
    const [pdfText, setPdfText] = useState('');

    const [errResponse, setErrResponse] = useState(false);

    const [uuidState, setUuidState] = useState();

    const [textLoading, setTextLoading] = useState(null);
    const [fileDetails, setFileDetails] = useState(null);

    const [fileSize, setFileSize] = useState(null);
    const [fileName, setFileName] = useState(null);


    const [addFile,
        { data: FileMutatedata,
            loading: FileMutateLoading,
            error: FileMutateError }] = useMutation(ADD_FILE);





    let axiosConfig = {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }

    let axiosConfigUuidMap = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token
        }
    }

    let axiosPayload = {

        "pdf": selectedFile

    }

    let axiosPayloadUuidMap = {

        "uuid": uuidState,

        "name": fileName

    }

    const onSubmitClickHandler = () => {

        setTextLoading(true);



        console.log(selectedFile, 'after upload button')




        const data = new FormData()
        data.append('pdf-file', selectedFile)
        data.append('uuid', uuidState)
        //console.log(data, 'clicked for upload')



        axios.post(
            pdfToTextEndPoint,
            data,
            axiosConfig
        )
            .then(response => {

                console.log(response.statusText, response.data)
                setTextLoading(false);

            }).then(() => {
                // if received job id then add into mongo document
                // send to Mongo db, file uploaded related details
                console.log(fileName, fileSize)

                addFile({
                    variables: {
                        uuid: uuidState.toString(),
                        name: fileName,
                        size: fileSize,
                        metaData: JSON.stringify(fileDetails),
                        uploadedBy: session.getCurrentUser.username
                    }



                }).then(() => {

                    // also map uuid to file name for redis
                    axios.post(
                        setUuidNameMappingPoint,
                        {

                            "uuid": uuidState,

                            "name": fileName

                        },
                        axiosConfigUuidMap
                    )
                        .then(response => {

                            console.log(response.status)

                        })

                }).catch(function (error) {
                    console.log('failed to store file details in mongodb')
                    setTextLoading(false);
                    setErrResponse('Error in uploading file details.')
                });


            }).catch(function (error) {
                console.log('did not recieve job id from pdftotext api')
                setTextLoading(false);
                setErrResponse('Pdf file not uploaded. Error in processing file')
            });



    }

    const UploadIcon = () => (

        <div style={{ marginLeft: 10 }}>
            <img style={{ width: 32 }} src="static/img/upload.png" alt="upload" />
        </div>

    )


    const onSelectFileHandler = event => {

        // using nanoid of 12 characters length
        setUuidState(nanoid(12));


        setSelectedFile(event.target.files[0])
        console.log(selectedFile, typeof (selectedFile))

        let fileMeta = {
            name: event.target.files[0].name,
            size: event.target.files[0].size,
            type: event.target.files[0].type,
            modifiedDate: event.target.files[0].lastModified
        }

        setFileDetails(fileMeta)

        setFileSize(Math.floor(event.target.files[0].size / 1000000))
        setFileName(event.target.files[0].name.replace('.pdf', ''))

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
                        onChange={onSelectFileHandler}

                        style={{ display: "none" }}
                    />

                </Button>
                <br />
                {!selectedFile && <span className="upload-limit-notice">*max upload file size 50 MB<br />**scanned pdfs not supported</span>}
                <br />


            </div>

            { fileSize > 50 && <span className="upload-limit-notice">please upload a file with a size smaller than 50 MB</span>}

            <div>
                {
                    selectedFile && fileSize <= 50 &&

                    <Button style={{ marginTop: 5, marginBottom: 20 }} variant="contained" component="label"
                        onClick={onSubmitClickHandler}

                    >
                        Submit
                    </Button>
                }
                {/* {FileMutateLoading && <p>Loading...</p>} */}



                {errResponse != false ? <h6 style={{ fontWeight: 300, color: 'red' }}>{errResponse}</h6> : null}


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