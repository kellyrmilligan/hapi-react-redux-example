import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

export default class Layout extends Component {

  static propTypes = {
    assets: PropTypes.object,
    content: PropTypes.string,
    config: PropTypes.object,
    state: PropTypes.string
  }

  render () {
    const { assets, content, state } = this.props
    const head = Helmet.rewind()

    return (
      <html lang='en-us'>
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel='shortcut icon' href='/favicon.ico' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link href={assets.app.css} rel='stylesheet' />
        </head>
        <body>
          <div id='react-root' dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: `window.__data=${state}` }} charSet='UTF-8' />
          <script src={assets.app.js} defer />
        </body>
      </html>
    )
  }
}
