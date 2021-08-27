import React, { useState } from "react";
import CryptoJS from "crypto-js";



import axios from "axios";

import { useMutation } from "@apollo/react-hooks";
import { ADD_FILE } from "../../queries";

import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./UploadButton.css";

const UploadButton = () => {
  let pdfToTextEndPoint = process.env.REACT_APP_PREDICTOR_API + "pdf-to-text";
  let checkUniqueHashEndPoint =
    process.env.REACT_APP_REDIS_API_ENDPOINT + "uniqueBookCheck";

  const [selectedFile, setSelectedFile] = useState(null);

  const [errResponse, setErrResponse] = useState(false);

  const [textLoading, setTextLoading] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const [fileHash, setFileHash] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);

  const [
    addFile,
    {
      data: FileMutatedata,
      loading: FileMutateLoading,
      error: FileMutateError,
    },
  ] = useMutation(ADD_FILE);

  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  let axiosHeaders = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const onSubmitClickHandler = () => {
    setTextLoading(true);


    const fileData = new FormData();
    fileData.append("pdf-file", selectedFile);
    fileData.append("uuid", fileHash);


    axios
      .post(
        checkUniqueHashEndPoint,
        {
          hash: fileHash,
        },
        axiosHeaders
        //check in redis if file is unique or not
      )
      .then((response) => {
        console.log(response?.data);
        return response.data;
      })
      .then((data) => {
        if (data.unique === 0) {
          setErrResponse("file already exists at hash " + data.hash);
          setTextLoading(false);
        } else {
          //new file so save in s3 then mongo
          axios
            .post(pdfToTextEndPoint, fileData, axiosConfig)
            .then((response) => {
              console.log(response.statusText, response.data)
              setTextLoading(false);
            })
            .then(() => {
              // if received job id then add into mongo document
              // send to Mongo db, file uploaded related details
              //console.log(fileName, fileSize)

              addFile({
                variables: {
                  hash: fileHash,
                  name: fileName,
                  size: fileSize,
                  type: fileType,
                },
              }).catch(function (error) {
                //console.log('failed to store file details in mongodb')
                setTextLoading(false);
                setErrResponse("Error in uploading file details.");
              });
            })
            .catch(function (error) {
              //console.log('did not recieve job id from pdftotext api')
              setTextLoading(false);
              setErrResponse("Pdf file not uploaded. Error in processing file");
            });
        }
      });
  };

  const UploadIcon = () => (
    <div style={{ marginLeft: 10 }}>
      <img style={{ width: 32 }} src="static/img/upload.png" alt="upload" />
    </div>
  );

  const onSelectFileHandler = (event) => {
    // load the first file
    var file = event.target.files[0];

    //Instantiate a reader
    var reader = new FileReader();

    // If we use onloadend, we need to check the readyState.
    reader.onloadend = function (evt) {
      if (evt.target.readyState === FileReader.DONE) {
        // DONE == 2

        var wordArray = CryptoJS.lib.WordArray.create(evt.target.result);
        var hash = CryptoJS.SHA256(wordArray).toString();
        setFileHash(hash);
      }
    };
    reader.readAsArrayBuffer(file);

    setSelectedFile(event.target.files[0]);

    setFileSize(Math.floor(event.target.files[0].size / 1000000));
    setFileName(event.target.files[0].name.match(/(.*)\.(.*)/)[1]);
    setFileType(event.target.files[0].type);
  };

  const classes = useStyles();

  return (
    <Container className="App">
      <div className="btn-grad-container">
        <Button variant="contained" component="label" endIcon={<UploadIcon />}>
          Upload your PDF File
          <input
            accept=".pdf"
            type="file"
            onChange={onSelectFileHandler}
            style={{ display: "none" }}
          />
        </Button>

        <br />

        {!selectedFile && (
          <span className="upload-limit-notice">
            *max upload file size 50 MB
            <br />
            **scanned pdfs not supported
          </span>
        )}

        {selectedFile && <span>file selected: {fileName}</span>}
        <br />
      </div>

      <div>
        {fileSize > 50 && (
          <span className="upload-limit-notice">
            please upload a file with a size smaller than 50 MB
          </span>
        )}

        {selectedFile && fileSize <= 50 && (
          <Button
            style={{ marginTop: 5, marginBottom: 20 }}
            variant="contained"
            component="label"
            onClick={onSubmitClickHandler}
          >
            Submit
          </Button>
        )}
        {FileMutatedata && <p>Done uploading!</p>}
        {/* {FileMutateLoading && <p>Loading...</p>} */}

        {errResponse !== false ? (
          <h6 style={{ fontWeight: 300, color: "red" }}>{errResponse}</h6>
        ) : null}

        <Backdrop className={classes.backdrop} open={textLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Container>
  );
};

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default UploadButton;
