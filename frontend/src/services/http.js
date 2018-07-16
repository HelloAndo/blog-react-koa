import axios from 'axios'

class Http {
  constructor () {
    this.http = axios.create({
      baseURL: 'http://localhost:3001/api'
    })

    this.http.interceptors.request.use(conf => {
      console.log(conf)
      conf.headers.Authorization = window.localStorage.getItem('blog-react-koa') || ''
      return conf
    })

    this.http.interceptors.response.use(conf => {
      console.log(conf)
      return conf.data
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