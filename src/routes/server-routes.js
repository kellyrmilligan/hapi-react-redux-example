import path from 'path'

export default [
  {
    method: 'GET',
    path: '/{param*}',
    config: {
      security: true
    },
    handler: { hapiReactReduxHandler: {} }
  },
  {
    method: 'GET',
    path: '/api/{param*}',
    handler: {
      proxy: {
        passThrough: true,
        mapUri: function (request) {
          // const headers = {
          //   'Authorization': `token ${process.env.GITHUB_API_TOKEN}`,
          //   'User-Agent': process.env.GITHUB_USERNAME
          // }
          return {
            uri: `${process.env.APP_GITHUB_API_URL}/${request.params.param}`,
          }
          // return {
          //   uri: `${process.env.GITHUB_API_URL}/${request.params.param}`,
          //   headers
          // }
        },
      }
    }
  },
  {
    method: 'GET',
    path: '/static/{param*}',
    options: {
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    },
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: true,
      }
    }
  }
]
