import React, { Component } from 'react';

import { Query } from 'react-apollo';

import { Redirect } from 'react-router-dom';

import { GET_CURRENT_USER } from '../queries';


const withAuth = conditionFunc => Component => props => (

    <Query query={GET_CURRENT_USER}>

        {( {data, loading, error } ) => {

            return conditionFunc(data) ? <Component {...props } /> : <Redirect to="/login" />
        }}


    </Query>
    
);

export default withAuth;

