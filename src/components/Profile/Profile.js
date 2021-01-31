import React from 'react';
import UserInfo from './UserInfo';


import { Container, Row, Col } from 'reactstrap';


import withAuth from '../withAuth';
import UploadButton from '../Read/UploadButton';




const Profile = ({ session }) => {



    return (

        <Container className="App">

            <Row>

                <Col md="1">



                </Col>

                <Col md="10">

                    <UserInfo session={session} />
             

                    <UploadButton/>

               
                    <hr />
                    

              

                    

                    <h5>Your activuty</h5>

                </Col>


            </Row>
        </Container>



    );
}

export default withAuth(session => session && session.getCurrentUser)(Profile);