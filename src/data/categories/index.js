import { createSelector } from 'reselect'

// SELECTOR
const categories = (state) => state.categories

export const getCategories = createSelector(
  [categories],
  categories => categories
)

// CONSTANTS
export const FETCH_CATEGORIES_LOADING = 'FETCH_CATEGORIES_LOADING'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR'

function fetchCategoriesLoading () {
  return {
    type: FETCH_CATEGORIES_LOADING
  }
}

function fetchCategoriesSuccess (categoryResponse) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categoryResponse
  }
}

function fetchCategoriesError (err, payload) {
  return {
    type: FETCH_CATEGORIES_ERROR,
    payload: {
      err,
      payload
    },
    error: true
  }
}

export function fetchCategories () {
  return (dispatch, getState, serviceClient) => {
    dispatch(fetchCategoriesLoading())

    return new Promise((resolve, reject) => {
      return serviceClient
        .get(`/categories`)
        .then(res => {
          resolve(res.body)
          dispatch(fetchCategoriesSuccess(res.body))
        })
        .catch((err, payload) => {
          reject(err, payload)
          dispatch(fetchCategoriesError(err, payload))
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
    case FETCH_CATEGORIES_LOADING: {
      return {
        ...state,
        isFetching: true,
        error: null,
        isError: false
      }
    }
    case FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    }
    case FETCH_CATEGORIES_ERROR: {
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
