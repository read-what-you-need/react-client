import React from 'react';

import Alert from '@material-ui/lab/Alert';
import { Col } from 'reactstrap';

const UnderProcess = () => {
    
    return (
        <Col lg={{size:"6", offset:3}} style={{marginTop: 120}}>
            <Alert severity="info" style={{fontSize:18}}>Check back after 20 to 30 minutes.<br/>The file is yet to be processed and is in a queue right now.</Alert>
        </Col>

    );
}






export default UnderProcess;

