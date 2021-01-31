import React from 'react';

import { Container, Row, Col } from 'reactstrap';


import moment from 'moment';





const UserInfo = ({ session }) => {

    var date = moment(parseInt(session.getCurrentUser.joinDate)).format('MMM DD, YYYY')

    return (


        <Col className="user-info" >

            <h3>User Info</h3>

            <p>Username: {session.getCurrentUser.username}</p>

            {/* <p>Email: {session.getCurrentUser.email}</p> */}

            <p>Joined on: {date}</p>

        </Col>


    );
}

export default UserInfo;