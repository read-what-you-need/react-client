import React from 'react';


import { Container, Row, Col } from 'reactstrap';

import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(2),
            width: theme.spacing(16),
            height: theme.spacing(16),
        },
    },
}));


const IntroCards = () => {
    const classes = useStyles();
    return (
        <Row className="main-page-about-row">

            <Col xs={10} lg={3} className="main-page-about-sub-header">

                

                  
                        Our AI reads the whole book for you
                   

                
            </Col>


            <Col xs={10} lg={3} className="main-page-about-sub-header">

                

                    Ask the AI for topics that exicte you

           
            </Col>


            <Col xs={10} lg={3} className="main-page-about-sub-header">

          

                  
                        Read the interesting part quickly :)

               
            </Col>


        </Row>
    );
}

export default IntroCards;