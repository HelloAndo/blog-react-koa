import Http from './http'

const APIs = {
  register: '/users/register',
  login: '/users/login',
  logout: '/users/logout',
  addArticle: '/article/add',
  getArticleList: '/article/getArticleList',
  getArticle: '/article/getArticle'
}

class Api extends Http {
  register (data, config) {
    return this.post(APIs.register, data, config)
  }

  login (params) {
    return this.get(APIs.login, params)
  }

  logout (params) {
    return this.get(APIs.logout, params)
  }

  addArticle (params) {
    return this.post(APIs.addArticle, params)
  }

  getArticleList (params) {
    return this.get(APIs.getArticleList, params)
  }

  getArticle (params) {
    return this.get(APIs.getArticle, params)
  }
}

export default new Api()