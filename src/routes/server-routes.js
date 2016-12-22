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
    path: '/static/{param*}',
    config: {
      cache: {
        expiresIn: 1000 * 60 * 60 * 24 * 7 * 52// 1 year
      },
      files: {
        relativeTo: path.resolve(__dirname, '../public')
      }
    },
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true
      }
    }
  }
]
