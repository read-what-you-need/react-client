import React from 'react';

import { Link } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    GET_USER_FILES
} from './../queries';


function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}



// book list should only show 5 elements, including more button

const BooksList = () => {
    const classes = useStyles();

    const { loading: queryLoading, error: queryError, data: queryData } = useQuery(
        GET_USER_FILES, { variables: { username: 'admin' } }

    );


    return (
        <div className={classes.root}>
            <List component="nav" >


            {queryData && queryData.getUserFiles.map((file, index) => {
              
              return (
                
                <Link to={'/read/' + file.uuid} style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon>
                        {index + 1}
                    </ListItemIcon>
                    <ListItemText primary={file.name} />
                </ListItem>
            </Link>

              )
            }

            )}


            </List>
            <Divider />

        </div>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
    },
}));


export default BooksList;