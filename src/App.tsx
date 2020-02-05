import React, { useState } from 'react';
import './App.sass';
import Snake from './components/Snake'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container, Grid, Paper } from '@material-ui/core';
import Settings from './components/Settings';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
}))

const App = () => {
  const classes = useStyles()

  let [app, setApp] = useState({
    isRender: false,
    settings: {
      row: 16,
      col: 16
    }
  })

  const saveHandler = (settings: { row: number; col: number; }) => {
    setApp(oldApp => {
      return {
        ...oldApp,
        isRender: true,
        settings
      }
    })
  }

  return (
    <div className="snake-app">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shake
          </Typography>
        </Toolbar>
      </AppBar>
      <Container className="snake-content" maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Settings onSave={saveHandler}/>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {
                app.isRender ? <Snake {...app.settings} /> : 'Empty'
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
