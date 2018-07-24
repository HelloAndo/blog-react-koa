import React from 'react'
import { Component } from "react";
import classNames from 'classnames'
import { Upload, Icon } from 'antd'
import { 
  withStyles, 
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  TextField,
  Button
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import 'antd/dist/antd.css'
import styles from './style'

import Api from '../../services/api'

class Edit extends Component {
  state = {
    article: {
      title: '',
      content: '',
      fileList: [
        // {
        //   uid: -1,
        //   name: 'xxx.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // }
      ],
    }
  }

  submit = () => {
    let { title, content } = this.state.article
    if (!title || !content) return
    const imgs = this.state.article.fileList.map(file => file.response.data.fileName)
    console.log(this.state.article)
    let postData = {
      ...this.state.article,
      imgUrl: imgs
    }
    delete postData.fileList
    Api.addArticle(postData)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  updateState = obj => {
    this.setState({
      article: {
        ...this.state.article,
        ...obj
      }
    })
  }

  onInputTitle = e => {
    this.updateState({ title: e.target.value })
  }

  onInputContent = e => {
    this.updateState({ content: e.target.value })
  }

  handlePreview = () => {

  }

  handleChange = (f) => {
    console.log(f)
    this.setState({
      article: {
        ...this.state.article,
        fileList: f.fileList
      }
    })
  }

  render () {
    const { classes } = this.props

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    )

    return (
      <div className={classes.container}>
        <FormControl>
          <InputLabel>Title</InputLabel>
          <Input value={this.state.article.title} onChange={this.onInputTitle}></Input>
          <FormHelperText></FormHelperText>
        </FormControl>
        <TextField
          value={this.state.article.content}
          onChange={this.onInputContent}
          id="textarea"
          label="文章"
          placeholder="请输入文章内容"
          multiline
          className={classes.textField}
          margin="normal"
        />
        <div>
          <Upload
            action="http://localhost:3001/api/upload"
            name="articleImage"
            listType="picture-card"
            fileList={this.state.article.fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {this.state.article.fileList.length >= 3 ? null : uploadButton}
          </Upload>
        </div>
        <div>
          <Button variant="contained" size="small" className={classes.button} onClick={this.submit}>
          <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
          保存
        </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Edit)