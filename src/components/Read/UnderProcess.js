import React from 'react';

import Alert from '@material-ui/lab/Alert';
import { Col } from 'reactstrap';

const UnderProcess = () => {
    
    return (
        <Col xs={{size:"8"}} lg={{size:"6", offset:3}} style={{marginTop: 120}}>
            <Alert severity="info" style={{fontSize:18}}>Check back after 5 to 6 hours.<br/>The file is yet to be processed and is in a queue right now.</Alert>
        </Col>

    );
}






export default UnderProcess;

