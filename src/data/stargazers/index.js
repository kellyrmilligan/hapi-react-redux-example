import { createSelector } from 'reselect'

// SELECTOR
const stargazers = (state) => state.stargazers

export const getStargazers = createSelector(
  [stargazers],
  (stargazers) => stargazers
)

// CONSTANTS
export const FETCH_STARGAZERS_LOADING = 'FETCH_STARGAZERS_LOADING'
export const FETCH_STARGAZERS_SUCCESS = 'FETCH_STARGAZERS_SUCCESS'
export const FETCH_STARGAZERS_ERROR = 'FETCH_STARGAZERS_ERROR'

function fetchStargazersLoading () {
  return {
    type: FETCH_STARGAZERS_LOADING
  }
}

function fetchStargazersSuccess (repos) {
  return {
    type: FETCH_STARGAZERS_SUCCESS,
    payload: repos
  }
}

function fetchStargazersError (err, payload) {
  return {
    type: FETCH_STARGAZERS_ERROR,
    payload: {
      err,
      payload
    },
    error: true
  }
}

export function fetchStargazers (owner, repo) {
  return (dispatch, getState, serviceClient) => {
    dispatch(fetchStargazersLoading())

    return new Promise((resolve, reject) => {
      return serviceClient
        .get(`/repos/${owner}/${repo}/stargazers`)
        .then((res) => {
          resolve(res.body)
          dispatch(fetchStargazersSuccess(res.body))
        })
        .catch((err, payload) => {
          resolve(err, payload)
          dispatch(fetchStargazersError(err, payload))
        })
    })
  }
}

const fetchstargazersReducer = (state = {
  isFetching: false,
  error: null,
  isError: false,
  stargazers: []
}, action) => {
  switch (action.type) {
    case FETCH_STARGAZERS_LOADING:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        isError: false
      })
    case FETCH_STARGAZERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        stargazers: action.payload
      })
    case FETCH_STARGAZERS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload,
        isError: true
      })
    default:
      return state
  }
}

export default fetchstargazersReducer
