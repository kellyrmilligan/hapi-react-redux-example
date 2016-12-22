export const RESET_PASSWORD_LOADING = 'RESET_PASSWORD_LOADING'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_SUCCESS'

function resetPasswordLoading () {
  return {
    type: RESET_PASSWORD_LOADING
  }
}

function resetPasswordSuccess () {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: {
      success: true
    }
  }
}

function resetPasswordError (err, payload) {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: {
      err,
      payload
    },
    error: true
  }
}

export function resetPassword (body) {
  return (dispatch, getState, serviceClient) => {
    dispatch(resetPasswordLoading())
    return new Promise((resolve, reject) => {
      return serviceClient
        .request({
          method: 'POST',
          path: '/api/reset-password',
          body: {
            ...body
          }
        })
        .then((res) => {
          resolve(res.body)
          dispatch(resetPasswordSuccess(res.body))
        })
        .catch((err, payload) => {
          reject(err, payload)
          dispatch(resetPasswordError(err, payload))
        })
    })
  }
}

const resetPasswordReducer = (state = {
  isFetching: false,
  error: null,
  isError: false,
  success: null
}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_LOADING:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        isError: false
      })
    case RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: action.payload.success
      })
    case RESET_PASSWORD_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        success: null,
        error: action.payload.err,
        isError: true
      })
    default:
      return state
  }
}

export default resetPasswordReducer
