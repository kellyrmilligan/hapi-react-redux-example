import { createSelector } from 'reselect'

// SELECTOR
const addresses = (state) => state.addresses

export const getAddresses = createSelector(
  [addresses],
  (addresses) => addresses
)

// CONSTANTS
export const FETCH_ADDRESSES_LOADING = 'FETCH_ADDRESSES_LOADING'
export const FETCH_ADDRESSES_SUCCESS = 'FETCH_ADDRESSES_SUCCESS'
export const FETCH_ADDRESSES_ERROR = 'FETCH_ADDRESSES_ERROR'

function fetchAddressesLoading () {
  return {
    type: FETCH_ADDRESSES_LOADING
  }
}

function fetchAddressesSuccess (addresses) {
  return {
    type: FETCH_ADDRESSES_SUCCESS,
    payload: addresses
  }
}

function fetchAddressesError (err, payload) {
  return {
    type: FETCH_ADDRESSES_ERROR,
    payload: {
      err,
      payload
    },
    error: true
  }
}

export function fetchAddresses () {
  return (dispatch, getState, serviceClient) => {
    dispatch(fetchAddressesLoading())

    return new Promise((resolve, reject) => {
      return serviceClient
        .request({
          method: 'GET',
          path: '/api/addresses'
        })
        .then((res) => {
          resolve(res)
          dispatch(fetchAddressesSuccess(res.body.addresses))
        })
        .catch((err, payload) => {
          resolve(err, payload)
          dispatch(fetchAddressesError(err, payload))
        })
    })
  }
}

const fetchAddressesReducer = (state = {
  isFetching: false,
  error: null,
  isError: false,
  items: []
}, action) => {
  switch (action.type) {
    case FETCH_ADDRESSES_LOADING:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        isError: false
      })
    case FETCH_ADDRESSES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.payload
      })
    case FETCH_ADDRESSES_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        addresses: [],
        error: action.payload,
        isError: true
      })
    default:
      return state
  }
}

export default fetchAddressesReducer
