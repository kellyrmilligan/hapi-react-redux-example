import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

const HomePage = class HomePage extends Component {

  render () {
    return (
      <main>
        <Helmet
          title='Home'
        />
        <p>Homepge</p>
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps
)(HomePage)
