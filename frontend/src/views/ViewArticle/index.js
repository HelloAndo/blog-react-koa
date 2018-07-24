import React from 'react'
import { Component } from "react";

import Api from '../../services/api'

export default class ViewArticle extends Component {

  state = {
    article: {
      title: '',
      content: '',
      imgUrl: []
    }
  }

  componentWillMount () {
    Api.getArticle({
      _id: this.props.match.params.id
    })
      .then(({ data }) => {
        this.setState({
          article: data[0]
        })
      })
  }

  render () {
    const { title, content, imgUrl } = this.state.article
    return (
      <div>
        <h1>{title}</h1>
        <p>{content}</p>
        {/* <p>{this.state.article.imgUrl[0]}</p> */}
        {/* <p>{imgUrl[0]}</p> */}
        <div className="img-wrapper">
          {
            imgUrl.map(src => (
              <img src={`http://localhost:3001/${src}`} alt=""/>
            ))
          }
        </div>
          
      </div>
    )
  }
}