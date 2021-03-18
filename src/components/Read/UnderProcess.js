import React from 'react';

import Alert from '@material-ui/lab/Alert';
import { Col } from 'reactstrap';

const UnderProcess = () => {

    return (
        <Col lg={{ size: "6", offset: 3 }} style={{ marginTop: 120 }}>
            <Alert severity="info" style={{ fontSize: 18 }}>Check back after 20 to 30 minutes.<br />The file is yet to be processed and is in a queue right now.</Alert>

            <div style={{ height: 10 }}></div>

            <img src={"https://healthchecks.io/badge/9eb09fbb-348a-4316-ba4d-c2e543/mOUW8jkG-2/AI-file-processor.svg"} />

        </Col>

    );
}






export default UnderProcess;

