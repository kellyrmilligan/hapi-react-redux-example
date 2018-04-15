import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'
import NProgress from 'nprogress'
import reactRouterFetch from 'react-router-fetch'
import { connect } from 'react-redux'

import routes from 'routes/client-routes'
import ScrollToTop from 'components/ScrollToTop'

NProgress.configure({ showSpinner: true })

class App extends Component {

  state = {
    isAppFetching: false,
    appFetchingError: null
  }

  componentWillReceiveProps (nextProps) {
    const current = `${this.props.location.pathname}${this.props.location.search}`
    const next = `${nextProps.location.pathname}${nextProps.location.search}`
    if (current === next) {
      return
    }
    this.fetchRoutes(nextProps)
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !nextState.isAppFetching
  }

  fetchRoutes (props) {
    const { dispatch, location } = props

    NProgress.start()
    this.setState({
      isAppFetching: true,
      appFetchingError: null
    })
    reactRouterFetch(routes, location, { dispatch })
      .then(() => {
        this.setState({
          isAppFetching: false
        })
        NProgress.done()
      })
      .catch((err) => {
        this.setState({
          isAppFetching: false,
          appFetchingError: err
        })
        NProgress.done()
      })
  }

  renderAppRoutes () {
    const { route } = this.props
    const { isAppFetching, appFetchingError } = this.state

    if (!isAppFetching && appFetchingError) {
      return (
        <main>
          <h1>Oopsies!</h1>
          <p>Something bad happened while we were getting that for you...</p>
        </main>
      )
    }
    return renderRoutes(route.routes)
  }

  render () {
    return (
      <ScrollToTop>
        <section className='App'>
          <Helmet titleTemplate='%s | Example app' />
          <section className='App__content'>
            {this.renderAppRoutes()}
          </section>
        </section>
      </ScrollToTop>
    )
  }

}

const connectedApp = connect()(App)
export default withRouter(connectedApp)
