import { createSelector } from 'reselect'

// SELECTOR
const orgRepos = (state) => state.orgRepos

export const getOrgRepos = createSelector(
  [orgRepos],
  (orgRepos) => orgRepos
)

// CONSTANTS
export const FETCH_ORGREPOS_LOADING = 'FETCH_ORGREPOS_LOADING'
export const FETCH_ORGREPOS_SUCCESS = 'FETCH_ORGREPOS_SUCCESS'
export const FETCH_ORGREPOS_ERROR = 'FETCH_ORGREPOS_ERROR'

function fetchOrgReposLoading () {
  return {
    type: FETCH_ORGREPOS_LOADING
  }
}

function fetchOrgReposSuccess (repos) {
  return {
    type: FETCH_ORGREPOS_SUCCESS,
    payload: repos
  }
}

function fetchOrgReposError (err, payload) {
  return {
    type: FETCH_ORGREPOS_ERROR,
    payload: {
      err,
      payload
    },
    error: true
  }
}

export function fetchOrgRepos (org) {
  return (dispatch, getState, serviceClient) => {
    dispatch(fetchOrgReposLoading())

    const { GITHUB_API_TOKEN } = getState().config

    return new Promise((resolve, reject) => {
      return serviceClient
        .get(`/orgs/${org}/repos`, {
          headers: {
            'Authorization': `token ${GITHUB_API_TOKEN}`
          }
        })
        .then((res) => {
          resolve(res.body)
          dispatch(fetchOrgReposSuccess(res.body))
        })
        .catch((err, payload) => {
          reject(err, payload)
          dispatch(fetchOrgReposError(err, payload))
        })
    })
  }
}

const fetchOrgReposReducer = (state = {
  isFetching: false,
  error: null,
  isError: false,
  repos: []
}, action) => {
  switch (action.type) {
    case FETCH_ORGREPOS_LOADING:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        isError: false
      })
    case FETCH_ORGREPOS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        repos: action.payload
      })
    case FETCH_ORGREPOS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.payload,
        isError: true
      })
    default:
      return state
  }
}

export default fetchOrgReposReducer
