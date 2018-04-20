import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchCategories, getCategories } from 'data/categories'

const Home = class Home extends Component {

  static fetch (match, location, { dispatch }) {
    return dispatch(fetchCategories())
  }

  render () {

    const {
      categoryResults: { data: categoriesData }
    } = this.props

    return (
      <main>
        <Helmet>
          <title>Event Categories</title>
        </Helmet>
        <h1>Event Categories</h1>
        {categoriesData && categoriesData.categories && categoriesData.categories.length > 0 &&
          <ul>
            {categoriesData.categories.map(category =>
              <li key={category.id}>
                <h2>
                  <Link to={`/categories/${category.id}`}>{category.name}</Link>
                </h2>
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
    categoryResults: getCategories(state)
  }
}

export default connect(
  mapStateToProps
)(Home)
