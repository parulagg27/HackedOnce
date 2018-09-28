import React from 'react';
import { Paper } from '@material-ui/core';

class MyVideo extends React.Component {
    componentDidMount = () => {
        let ctx = document.querySelector('#can').getContext('2d');
        ctx.fillStyle = 'blue';
        let navi = navigator;
        navi.mediaDevices.enumerateDevices().then((data) => {
            let devi = data.filter((d) => d.kind === 'videoinput');
            devi = devi[0];
            let obj = {
                video: {
                    deviceId: '',
                    facingMode: ['user', 'environment'],
                    height: { ideal: 1080 },
                    width: { ideal: 1920 },
                },
            };
            obj.video.deviceId = devi.deviceId;
        });
    }


    render = () => <React.Fragment>
        <Paper>
            <canvas id="can" width="0" height="0" style={{ border: "1px solid black", display: "hidden" }}></canvas>
            <video src="" style={{ left: "0px", top: "0px", margin: "0px", backgroundColor: "black", width: "100%", height: "100%", border: "2px solid black", position: "absolute", zIndex: "4" }} ></video>
        </Paper>
    </React.Fragment>
}

export default MyVideo;
