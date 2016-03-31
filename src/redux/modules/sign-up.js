import { handleActions } from 'redux-actions'

const SIGN_UP_REQUEST = 'users-ui/sign-up/REQUEST'
const SIGN_UP_SUCCESS = 'users-ui/sign-up/SUCCESS'
const SIGN_UP_FAIL = 'users-ui/sign-up/FAIL'

const initial_state = {}

export const reducer = handleActions({
  SIGN_UP_REQUEST: (state, action) => ({
    state: SIGN_UP_REQUEST
  }),
  SIGN_UP_SUCCESS: (state, action) => ({
    state: SIGN_UP_SUCCESS,
    data: action.result
  }),
  SIGN_UP_FAIL: (state, action) => ({
    state: SIGN_UP_FAIL,
    error: action.error
  })
}, initial_state)

export const sign_up = ({ email, password, onSuccess, onError }) => ({
  types: [SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAIL],
  promise: client => new Promise((resolve, reject) => {
    const data = {
      email,
      password,
      confirm_success_url: 'http://localhost:8080/confirm_sign_up'
    }
    return client.post('/v1/users', { data }).then(res => {
      if (onSuccess) {
        onSuccess(res)
      }
      resolve(res)
    }).catch(err => {
      if (onError) {
        onError(err)
      }
      reject(err)
    })
  })
})
