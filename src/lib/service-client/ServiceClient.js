import request from 'superagent'

export default class ServiceClient {

  constructor (options) {
    if (options) this.configure(options)
  }

  _apiUrl = null

  _globalHeaders = null

  set globalHeaders (headers) {
    this._globalHeaders = headers
  }

  get globalHeaders () {
    return this._globalHeaders
  }

  set apiUrl (host) {
    this._apiUrl = host
  }

  get apiUrl () {
    return this._apiUrl
  }

  configure (options) {
    this.apiUrl(options.apiUrl)
    this.globalHeaders(options.globalHeaders)
  }

  constructHeaders (headers) {
    const newHeaders = {
      ...this.globalHeaders,
      ...headers
    }

    return newHeaders
  }

  constructUrl (path) {
    return this.apiUrl + '/' + path
  }

  makePath (path) {
    // check if path starts with slash, if so, remove it
    if (path.charAt(0) === '/') {
      path = path.slice(1)
    }

    return this.constructUrl(path)
  }

  makeRequest (method, path, options, callback) {
    const headers = this.constructHeaders(options.headers)
    const requestPath = this.makePath(path)
    const serviceCall = request(method, requestPath)

    serviceCall.set(headers)
    if (options.query) serviceCall.query(options.query)
    if (options.body) serviceCall.send(options.body)

    if (callback) {
      return serviceCall.end(callback)
    }

    return serviceCall
  }

  get (path, options, callback) {
    return this.makeRequest('GET', path, options, callback)
  }

  del (path, options, callback) {
    return this.makeRequest('DELETE', path, options, callback)
  }

  post (path, options, callback) {
    return this.makeRequest('POST', path, options, callback)
  }

  patch (path, options, callback) {
    return this.makeRequest('PATCH', path, options, callback)
  }

  put (path, options, callback) {
    return this.makeRequest('PUT', path, options, callback)
  }

}
