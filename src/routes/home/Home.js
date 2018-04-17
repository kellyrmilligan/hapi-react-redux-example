import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Home = class Home extends Component {

  static fetch (match, location, { dispatch }) {
  }

  render () {
    return (
      <main>
        <Helmet>
          <title>Homies</title>
        </Helmet>
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

// const mapStateToProps = (state, ownProps) => {
//   return {
//   }
// }

export default connect(
  // mapStateToProps
)(Home)
