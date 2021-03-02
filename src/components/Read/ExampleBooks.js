import React from 'react';
import { useHistory } from "react-router-dom";


import { Container, Row, Col } from 'reactstrap';

import Paper from '@material-ui/core/Paper';

const ExampleBooks = () => {
  const history = useHistory();

  return (

    <Row className="main-page-examples" style={{ marginBottom: 50 }}>

      <Col xs={12} md={4}>

        <Paper elevation={5} onClick={() => {

          history.push("/read/FtVFhFEGj2sR")

        }}>

          <div style={{

            height: 300,



            backgroundImage: `url(${"static/img/public.jpg"})`,

            backgroundSize: 'cover',

            backgroundRepeat: 'no-repeat',

            borderRadius: 10


          }

          }>

          </div>
        </Paper>
      </Col>


      <Col xs={12} md={4}>
        <Paper elevation={5} onClick={() => {

          history.push("/read/qSAo37jpHA6I")

        }}>

          <div style={{

            height: 300,


            backgroundImage: `url(${"static/img/nava.jpg"})`,

            backgroundSize: 'cover',

            backgroundRepeat: 'no-repeat',

            borderRadius: 32


          }

          }>

          </div>
        </Paper>

      </Col>


      <Col xs={12} md={4}>

        <Paper elevation={5} onClick={() => {
          
          history.push("/read/Q0trTvVmIBNL")

        }}>

          <div style={{

            height: 300,



            backgroundImage: `url(${"static/img/benj.jpg"})`,

            backgroundSize: 'cover',

            backgroundRepeat: 'no-repeat',

            backgroundPosition: 'center',

            borderRadius: 10


          }

          }>

          </div>
        </Paper>



      </Col>



    </Row>


  );
}

export default ExampleBooks;