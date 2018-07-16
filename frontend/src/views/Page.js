import React, { Component } from 'react'
import {
  Route
} from 'react-router-dom'
import ViewArticle from './ViewArticle/index'
import Edit from './Edit/';
import ArticleList from './ArticleList'
import { withStyles } from '@material-ui/core';
import App from '../App';

const styles = _ => ({
  root: {
    width: '100%',
    marginTop: '70px',
    padding: '10px 20px'
  }
})

// const Page = () => {
class Page extends Component {

  render () {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        {/* <Route path='/' component={Edit}/> */}
          {/* <IndexRoute component={Edit} /> */}
          <Route path="/view/:id" component={ViewArticle} />
          <Route path="/edit" component={Edit} />
          <Route path='/list/:author' component={ArticleList}/>
          
      </div>
    )
  }
}

// export default Page
export default withStyles(styles)(Page);