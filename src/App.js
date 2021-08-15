import React from "react";


import UploadButton from "./components/UploadButton/UploadButton";



import { Container, Row, Col } from "reactstrap";
import Footer from "./components/Footer/Footer";

import logo from "./logo.png";
import "./App.css";

const App = ({ session }) => {
  return (
    <Container style={{ paddingRight: 0, paddingLeft: 0 }}>
      <Row>
        <Col md="12" className="App">
          
          <img src={logo} alt="logo" />
          <h1>Read what you need</h1>

     

          <UploadButton session={session} />

       

          <Footer/>

 
        </Col>
      </Row>
    </Container>
  );
};

export default App;
