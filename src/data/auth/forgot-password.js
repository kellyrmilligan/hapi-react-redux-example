export const FORGOT_PASSWORD_LOADING = 'FORGOT_PASSWORD_LOADING'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'

function forgotPasswordLoading () {
  return {
    type: FORGOT_PASSWORD_LOADING
  }
}

function forgotPasswordSuccess (success) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: success
  }
}

function forgotPasswordError (err, payload) {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload: {
      err,
      payload
    },
    error: true
  }
}

export function forgotPassword (body) {
  return (dispatch, getState, serviceClient) => {
    dispatch(forgotPasswordLoading())

    return new Promise((resolve, reject) => {
      return serviceClient
        .request({
          method: 'POST',
          path: '/api/forgot-password',
          body: {
            ...body
          }
        })
        .then(
          (res) => {
            resolve(res)
            dispatch(forgotPasswordSuccess(res.body))
          },
          (err, payload) => {
            reject(err, payload)
            dispatch(forgotPasswordError(err, payload))
          }
        )
    })
  }
}

const forgotPasswordReducer = (state = {
  isFetching: false,
  error: null,
  isError: false,
  success: null
}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_LOADING:
      return Object.assign({}, state, {
        isFetching: true,
        error: null,
        isError: false
      })
    case FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        success: action.payload.success
      })
    case FORGOT_PASSWORD_ERROR:
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

export default forgotPasswordReducer
