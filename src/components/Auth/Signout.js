import React from 'react';
import { withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';



import ListItemText from '@material-ui/core/ListItemText';

import Button from '@material-ui/core/Button';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';


import { ApolloConsumer } from 'react-apollo';

const handleSignout = (client, history) => {

    localStorage.setItem('token', '');

    client.resetStore();

    history.push('/');

}

const Signout = ({ history }) => (

    <ApolloConsumer>

        {client => {

            return (

                <List>


                    <ListItem onClick={() => handleSignout(client, history)}
                        button key={'signout'} style={{ opacity: '50%' }} >
                        <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItem>



                </List>
            )
        }}



    </ApolloConsumer>



);

export default withRouter(Signout);
