import axios from 'axios'

import store from '../store/index.js'
import * as Actions from '../store/actions'

const tokenKey = 'blog-react-koa-token'

class Http {
  constructor () {
    this.http = axios.create({
      baseURL: 'http://localhost:3001/api'
    })

    this.http.interceptors.request.use(conf => {
      console.log(conf)
      conf.headers.Authorization = window.localStorage.getItem(tokenKey) || ''
      return conf
    })

    this.http.interceptors.response.use(data => {
      console.log(data)
      let res = data.data
      if (res.token) {
        // token过期需刷新
        res.code === 1 && (res.code = 0)
        window.localStorage.setItem(tokenKey, res.token)
      } else if (res.code === -1) {
        // 弹出登录框
        store.dispatch(Actions.handleUserDialog(true))
      }
      return res
    })
  }

  get (url, params={}) {
    return this.http.get(url, { params: params })
  }

  post (url, data={}, config={}) {
    return this.http.post(url, { ...data, ...config })
  }
}

export default Http