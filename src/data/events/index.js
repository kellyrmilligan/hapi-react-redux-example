import { createSelector } from 'reselect'

// SELECTOR
const events = (state) => state.events

export const getEvents = createSelector(
  [events],
  events => events
)

// CONSTANTS
export const FETCH_EVENTS_LOADING = 'FETCH_EVENTS_LOADING'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_ERROR = 'FETCH_EVENTS_ERROR'

function fetchEventsLoading () {
  return {
    type: FETCH_EVENTS_LOADING
  }
}

function fetchEventsSuccess (eventsResponse) {
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: eventsResponse
  }
}

function fetchEventsError (err, payload) {
  return {
    type: FETCH_EVENTS_ERROR,
    payload: {
      err,
      payload
    },
    error: true
  }
}

export function fetchEvents (id) {
  return (dispatch, getState, serviceClient) => {
    dispatch(fetchEventsLoading())

    return new Promise((resolve, reject) => {
      return serviceClient
        .get(`/events?categories=${id}`)
        .then(res => {
          resolve(res.body)
          dispatch(fetchEventsSuccess(res.body))
        })
        .catch((err, payload) => {
          reject(err, payload)
          dispatch(fetchEventsError(err, payload))
        })
    })
  }
}

export const reducer = (state = {
  isFetching: false,
  error: null,
  data: null
}, action) => {
  switch (action.type) {
    case FETCH_EVENTS_LOADING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        isError: false
      }
    }
    case FETCH_EVENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    }
    case FETCH_EVENTS_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      }
    }
    default:
      return state
  }
}
