import React from 'react';

import Alert from '@material-ui/lab/Alert';
import { Col } from 'reactstrap';

const UnderProcess = () => {

    return (
        <Col className="App" style={{ marginTop: 120 }}>
            
            <span>
            Check back after 20 to 30 minutes. The file is yet to be processed and is in a queue right now.
            </span>

            <div style={{ height: 10 }}></div>

            <img src={"https://healthchecks.io/badge/9eb09fbb-348a-4316-ba4d-c2e543/mOUW8jkG-2/AI-file-processor.svg"} />

        </Col>

    );
}






export default UnderProcess;

