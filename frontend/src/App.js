import React from 'react'
import { 
  BrowserRouter as Router
} from 'react-router-dom'

import { withStyles } from '@material-ui/core';

import AppBar from './components/app-bar'
import Sidebar from './components/drawer'
import Page from './views/Page'

const styles = _ => ({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  }
})

class App extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <Router>
        <div className={classes.root}>
          <AppBar />
          <Sidebar></Sidebar>
          <Page />
        </div>
      </Router>
    )
  }
}

export default withStyles(styles)(App)