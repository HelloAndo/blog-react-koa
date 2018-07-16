import React, { Component } from 'react'

import {
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core'

import Api from '../../services/api'
import { parseQuery } from '../../mixins/index'

const clomnData = [
  {
    id: 1,
    title: '一个有意义的星期天',
    author: '小周',
    time: '2月3日',
    classic: '心情'
  },
  {
    id: 2,
    title: '一个有意义的星期天',
    author: '小明',
    time: '2月3日',
    classic: '心情'
  },
  {
    id: 3,
    title: '一个有意义的星期天',
    author: '小红',
    time: '2月3日',
    classic: '心情'
  }
]

class ArticleList extends Component {

  state = {
    articleList: []
  }

  gotoDetail = (e, id) => {
    // TODO: id如何以kv形式带入
    this.props.history.push(`/view/${id}`)
    // this.props.history.push({
    //   pathname: `/view`,
    //   params: { id }
    // })
  }

  // shouldComponentUpdate (nextProps, nextState) {
  //   return nextProps.location.search != this.props.location.search
  // }

  // componentWillUpdate () {
  //   this.getArticleList()
  // }
  
  componentWillMount () {
    this.getArticleList()
  }

  getArticleList () {
    let _filter = this.props.match.params.author
    Api.getArticleList({
      filter: _filter || '',
      t: Date.now()
    })
      .then((res) => {
        if (res.code) return
        this.setState({
          articleList: res.data
        })
      })
  }

  render () {
    return (
      <TableHead>
        {
          this.state.articleList.map(data => (
            <TableRow key={data.id} onClick={e => this.gotoDetail(e, data._id)}>
              <TableCell>{data.title}</TableCell>
              <TableCell>{data.content}</TableCell>
              <TableCell>{data.author}</TableCell>
              <TableCell>{data.time}</TableCell>
              <TableCell>{data.classic}</TableCell>
            </TableRow>
          ))
        }
      </TableHead>
    )
  }
}

export default ArticleList