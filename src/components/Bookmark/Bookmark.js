import React from 'react';


import { Container, Row, Col } from 'reactstrap';


import withAuth from './../withAuth';

const Bookmark = ({session}) => {

    const username = session.getCurrentUser.username;
    return (

        <Container>

            <Row>

                <Col md="2">



                </Col>

                <Col md="9">

                    <h4>welcome to your bookmarks!</h4>
                    <h4>{username}</h4>

                    <hr />

                    <li>book3
                        <ul> - what is

                            <li>hello</li>
                            <li>hello</li>
                            <li>hello</li>
                            <li>hello</li>
                            <li>hello</li>
                        </ul>

                        <ul> - what is</ul>
                        <ul> - what is</ul>
                        <ul> - what is</ul>
                    </li>
                    
                 


                </Col>


            </Row>
        </Container>
    );
}

export default withAuth(session => session && session.getCurrentUser)(Bookmark);