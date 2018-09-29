import React, { Component } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Grid, Paper, Button } from "@material-ui/core";
import i from './images/dance.jpg';
import s from './images/nondanceaa.jpeg';
// import t from './images/danceaa.jpg';

import tf from '@tensorflow/tfjs';
import *  as posenet from "@tensorflow-models/posenet";
import similarity from "compute-cosine-similarity";
import { resolve } from 'path';
class App extends Component {
  constructor() {
    super();
    this.state = {
      value1: "Waiting",
      file: s
    }
  }
  start = () => {
    let imageScaleFactor = 0.5;
    let outputStride = 16;
    let flipHorizontal = false;
    let posvector1 = [];
    let posvector2 = [];
    // var imageElement = document.getElementById('dance');
    new Promise(async (res, rej) => {
      await posenet.load().then((net) => {
        return net.estimateSinglePose(document.querySelector("#f"), imageScaleFactor, flipHorizontal, outputStride)
      }).then((pose) => {
        console.log(pose);
        for (let index = 0; index < pose["keypoints"].length; index++) {
          posvector1.push(pose["keypoints"][index]["position"]["x"]);
          posvector1.push(pose["keypoints"][index]["position"]["y"]);
        }
        console.log(pose["keypoints"][0]["position"]);
        console.log(posvector1);
      })
      // pos["keypoints"][]
      // var imageElement2 = document.getElementById('danceaa');
      await posenet.load().then(function (net) {
        return net.estimateSinglePose(document.querySelector("#s"), imageScaleFactor, flipHorizontal, outputStride)
      }).then(function (pose) {
        console.log(pose);
        for (let index = 0; index < pose["keypoints"].length; index++) {
          posvector2.push(pose["keypoints"][index]["position"]["x"]);
          posvector2.push(pose["keypoints"][index]["position"]["y"]);
        }
        // pos["keypoints"][]
        console.log(pose["keypoints"][0]["position"]);
        console.log(posvector2);
      })
      // con/sole.log("A")
      console.log(this.Second(posvector1, posvector2));
      res(JSON.stringify({ "res": this.Second(posvector1, posvector2) }));
    }).then((res) => {
      res = JSON.parse(res);
      this.setState({
        'value1': res.res
      })
    })
  }
  Second = (p1, p2) => {
    let cos = similarity(p1, p2);
    let d = 2 * (1 - cos);
    return Math.sqrt(d);
  }
  Dotproduct = (a, b) => {
    var n = 0, lim = Math.min(a.length, b.length);
    for (var i = 0; i < lim; i++) n += a[i] * b[i];
    return n;
  }
  Norm2 = (a) => { var sumsqr = 0; for (var i = 0; i < a.length; i++) sumsqr += a[i] * a[i]; return Math.sqrt(sumsqr); }
  Similarity = (a, b) => {
    return this.Dotproduct(a, b) / this.Norm2(a) / this.Norm2(b);
  }
  render() {
    return (<React.Fragment>
      <CssBaseline />
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="headline" color="inherit">
            PosLearn
        </Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" style={{ marginTop: 100 }} spacing={24}>
        <Grid item md={6} xs={12}>
          <Paper>
            <img src={i} id="f" alt={"second"} style={{ width: '100 %', maxHeight: 500 }} />
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper>
            <img src={this.state.file} id="s" alt={"second"} style={{ width: '100 %', maxHeight: 500 }} />
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Button variant="contained" color="primary" onClick={() => {
            this.setState({ value1: "Waiting" });
            this.start();
          }}>
            Start
          </Button>
          {this.state.value1}
        </Paper>

      </Grid>
      <Grid item xs={6}>
        <input type="file" onChange={(event) => {
          // console.log(event.target.files[0]);
          this.setState({ file: new FileReader().readAsDataURL(event.target.files[0]) });
          // document.querySelector("#s").src = event.target.files[0]
        }} />
      </Grid>

    </React.Fragment >);
  }
}

export default App;
