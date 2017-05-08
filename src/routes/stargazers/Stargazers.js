import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchStargazers, getStargazers } from 'data/stargazers'

const StargazersPage = class StargazersPage extends Component {

  static fetch (match, location, { dispatch }) {
    return dispatch(fetchStargazers(match.params.owner, match.params.repo))
  }

  render () {
    return (
      <main>
        <Helmet
          title='Stargazers'
        />
        <h1>Stargazers</h1>
        <h2><Link to='/'>Back to Repos</Link></h2>
        {this.props.stargazers &&
          <ul>
            {this.props.stargazers.stargazers.map((stargazer) =>
              <li key={stargazer.id}>
                <h2>{stargazer.login}</h2>
                <img src={stargazer.avatar_url} width='50' height='50' />
                <p><Link to='/'>Back to Repos</Link></p>
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
