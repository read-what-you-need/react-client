import React from 'react';

import { Query } from 'react-apollo';

import { GET_CURRENT_USER } from '../queries';

import Spinner from './Spinner';


const withSession = Component => props => (

    <Query query={GET_CURRENT_USER}>

        {({ data, loading, refetch }) => {

            if (loading) return (
                <div className="session-loader">

                    <Spinner />

                </div>
            );

            //console.log(data, 'with session page');

            return (

                <Component {...props} refetch={refetch} session={data} />

            )

        }}

    </Query>

)

export default withSession;