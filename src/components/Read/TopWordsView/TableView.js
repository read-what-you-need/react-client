import React, { useState, useContext, useEffect } from 'react';


import { SearchContext } from '../SearchContextMangement';

import { Container, Row, Col } from 'reactstrap';


import Chip from '@material-ui/core/Chip';
import Tooltip from '@material-ui/core/Tooltip';

import Divider from '@material-ui/core/Divider';


import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    root: {
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,

    },
    label: {
        fontSize: 24
    },
});

const TableVIew = ({ topN }) => {


    const classes = useStyles();
    const state = useContext(SearchContext);

    console.log(topN)

    return (
        <Container>

            <Row>
                <Col xs="6">

                    <span className="text" style={{marginRight:15}}>Keyword</span>

                </Col>

                <Col xs="6">
                    <span className="text">No of occurences.</span>
                </Col>
            </Row>

            <hr/>
            {topN.map(

                ([key, value], i) =>

                    <Row>
                        <Col xs="6">

                            <Chip
                                key={Math.random()}
                                // avatar={<Avatar>{value}</Avatar>}

                                onClick={(e) => {
                                    e.preventDefault();
                                    state.setSearch(key);
                                }}
                                classes={{
                                    root: classes.root,
                                    label: classes.label,
                                }}

                                label={key} />

                        
                        </Col>

                        <Col xs="6">
                            <p className="keywords-occurence-value">{value}</p>
                            
                        </Col>
                        <Col>
                         <Divider /></Col>
                      
                    </Row>
                     

            )}

        </Container>
    );
}

export default TableVIew;