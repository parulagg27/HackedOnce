import React from 'react';
import { Paper } from '@material-ui/core';

class MyVideo extends React.Component {
    render = () => <React.Fragment>
        <Paper>
            <canvas width="0" height="0" style={{ border: "1px solid black", display: "hidden" }}></canvas>
            <video src="" style={{ left: "0px", top: "0px", margin: "0px", backgroundColor: "black", width: "100%", height: "100%", border: "2px solid black", position: "absolute", zIndex: "4" }} ></video>
        </Paper>
    </React.Fragment>
}

export default MyVideo;
