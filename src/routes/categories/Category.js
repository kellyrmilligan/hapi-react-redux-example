import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchEvents, getEvents } from 'data/events'

const Category = class Category extends Component {

  static fetch (match, location, { dispatch }) {
    return dispatch(fetchEvents(match.params.id))
  }

  render () {

    const {
      categoryEvents: { data: eventsData }
    } = this.props

    return (
      <main>
        <Helmet>
          <title>Category Events</title>
        </Helmet>
        <h1>Cateory Events</h1>
        <Link to={`/`}>&#x2190; Back to Categories</Link>
        {eventsData && eventsData.events && eventsData.events.length > 0 &&
          <ul>
            {eventsData.events.map(event =>
              <li key={event.id}>
                <h2>
                  {event.name.text}
               </h2>
               <p>
                  {event.description.text}
               </p>
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
    categoryEvents: getEvents(state)
  }
}

export default connect(
  mapStateToProps
)(Category)
