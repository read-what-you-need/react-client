import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_USER_FILES
} from './../queries';


/* 
- No, file name, date uploaded, processed

*/


function createData(name, dateUploaded, processStatus) {
  return { name, dateUploaded, processStatus };
}



const TopDocumentsTable = ({ session }) => {

  const classes = useStyles();

  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
    GET_USER_FILES, { variables: { username: session.getCurrentUser.username  }, pollInterval:1000 }

  );




  return (

    <div>


      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ background: '#f5f5f5' }}>
            <TableRow>
              <TableCell >No.</TableCell>
              <TableCell >Title</TableCell>
              <TableCell align="right">Date Uploaded</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="left">Status</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>

            {queryData && queryData.getUserFiles.map((file, index) => {
              
              return (
                //slicing the extension from the file name
                <TableRow key={file.name}>
                  <TableCell component="th" scope="row">    {index + 1}    </TableCell>
                  <TableCell > <Link to={'/read/' + file.uuid} >  {file.name}    </Link>    </TableCell>
                  <TableCell align="right">{file.createdDate}</TableCell>
                  <TableCell align="right">{file.size}MB</TableCell>
                  <TableCell align="right"> {

                    file.processStatus === 'true' ?
                      <i id="processStatus" class="twa twa-white-check-mark"></i> :
                      <i id="processStatus" class="twa twa-hourglass-with-flowing-sand"></i>}

                  </TableCell>
                </TableRow>

              )
            }

            )}


          </TableBody>
        </Table>
      </TableContainer>

    </div>



  );
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default TopDocumentsTable;