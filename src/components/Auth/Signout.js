import React from 'react';
import { withRouter } from 'react-router-dom';



import Button from '@material-ui/core/Button';


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
            
                <Button onClick={() => handleSignout(client, history)} style={{ marginTop: 20, opacity: '50%' }} variant="contained">Lognout</Button>
            )
        }}
        
        

    </ApolloConsumer>

    

);

export default withRouter(Signout);
