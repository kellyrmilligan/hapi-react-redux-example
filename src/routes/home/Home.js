import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchOrgRepos, getOrgRepos } from 'data/org-repos'

const HomePage = class HomePage extends Component {

  static fetch (params, query, { dispatch, getState }) {
    return dispatch(fetchOrgRepos('hapijs'))
  }

  render () {
    return (
      <main>
        <Helmet
          title='Repos'
        />
        <h1>Repos</h1>
        {this.props.orgRepos &&
          <ul>
            {this.props.orgRepos.repos.map((repo) =>
              <li key={repo.id}>
                <h2>
                  <Link to={`/repos/${repo.owner.login}/${repo.name}/stargazers`}>{repo.name}</Link>
                </h2>
                <p>{repo.description}</p>
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
    orgRepos: getOrgRepos(state)
  }
}

export default connect(
  mapStateToProps
)(HomePage)
