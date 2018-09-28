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
            navigator.mediaDevices.getUserMedia(obj).then((dd) => {
                let track = dd.getVideoTracks()[0];
                console.log(track)
                this.abc = track;
                this.zozo = window.URL.createObjectURL(dd);
                console.log(this.zozo)
                document.querySelector('video').src = track
                this.cc = document.createElement('canvas');
                const context = this.cc.getContext('2d');
                document.querySelector('#can').getContext('2d').drawImage(document.querySelector('video'), 0, 0);
            });
        });
    }


    render = () => <React.Fragment>
        <Paper>
            <canvas id="can" width="0" height="0" style={{ border: "1px solid black", right: "0px", top: "0px", margin: "0px", backgroundColor: "pink", width: "50%", height: "100%", border: "2px solid black", position: "absolute", zIndex: "4" }}></canvas>
            <video src="" style={{ left: "0px", top: "0px", margin: "0px", backgroundColor: "pink", width: "50%", height: "100%", border: "2px solid black", position: "absolute", zIndex: "4" }} ></video>
        </Paper>
    </React.Fragment>
}

export default MyVideo;
