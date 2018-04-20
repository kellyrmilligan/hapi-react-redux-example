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
        redirects: 2,
        mapUri: function (request) {
          const headers = {
            'Authorization': `Bearer ${process.env.EVENTBRITE_API_TOKEN}`,
          }
          return {
            uri: `${process.env.EVENTBRITE_API_URL}/${request.params.param}`,
            headers
          }
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
