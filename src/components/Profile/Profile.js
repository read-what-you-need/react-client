import React from 'react';
import UserInfo from './UserInfo';
import TopDocumentsTableDynamic from './../TopDocumentsTableDynamic';

import { Container, Row, Col } from 'reactstrap';


import withAuth from '../withAuth';
import UploadButton from '../Read/UploadButton';




const Profile = ({ session }) => {



    return (

        <Container className="App">

            <Row>

                <Col md="2">



                </Col>

                <Col md="9">

                    <UserInfo session={session} />
             

                    <UploadButton session={session}/>

               
                    <hr />
                    

              

                    

                    <h4>Your Files</h4>

                    <br/>

                    <TopDocumentsTableDynamic session={session}/>

                </Col>


            </Row>
        </Container>



    );
}

export default withAuth(session => session && session.getCurrentUser)(Profile);