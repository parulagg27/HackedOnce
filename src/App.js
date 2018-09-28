import React, { Component } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, Grid, Paper } from "@material-ui/core";
import MyVideo from './MyVideo';

class App extends Component {
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
      <Grid container style={{marginTop:100}} spacing={24}>
        <Grid item md={6} xs={12}>
          <Paper style={{ width: '150px' }}>
            <MyVideo />
          </Paper>
        </Grid>
        <Grid item md={6} xs={12}>
          <Paper>
            {/* <img src alt={"second"} style={{ width: '100 %' }} /> */}
          </Paper>
        </Grid>
      </Grid>

    </React.Fragment>);
  }
}

export default App;
