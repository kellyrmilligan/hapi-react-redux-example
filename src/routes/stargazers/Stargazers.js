import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const StargazersPage = class StargazersPage extends Component {

  static fetch (match, location, { dispatch }) {
  }

  render () {
    return (
      <main>
        <Helmet>
          <title>Detailszz</title>
        </Helmet>
        <h1>Stargazers</h1>
        <h2><Link to='/'>Back to Repos</Link></h2>
        {this.props.stargazers &&
          <ul>
            {this.props.stargazers.stargazers.map((stargazer) =>
              <li key={stargazer.id}>
                <h2>{stargazer.login}</h2>
                <p><Link to='/'>Back to Repos</Link></p>
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
//     stargazers: getStargazers(state)
//   }
// }

export default connect(
  // mapStateToProps
)(StargazersPage)
