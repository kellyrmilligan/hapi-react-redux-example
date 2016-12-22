import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchStargazers, getStargazers } from 'data/stargazers'

const StargazersPage = class StargazersPage extends Component {

  static fetch (params, query, { dispatch, getState }) {
    return dispatch(fetchStargazers(params.owner, params.repo))
  }

  render () {
    return (
      <main>
        <Helmet
          title='Stargazers'
        />
        <h1>Stargazers</h1>
        <Link to='/'>Back to Repos</Link>
        {this.props.stargazers &&
          <ul>
            {this.props.stargazers.stargazers.map((stargazer) =>
              <li key={stargazer.id}>
                <h2>{stargazer.login}</h2>
                <img src={stargazer.avatar_url} width='50' height='50' />
              </li>
            )}
          </ul>
        }
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stargazers: getStargazers(state)
  }
}

export default connect(
  mapStateToProps
)(StargazersPage)
