import constants from '../constants/constants'
import APIManager from '../../utils/APIManager'

const getRequest = (endpoint, params, actionType) => {
  return (dispatch) =>
    APIManager.get(endpoint, params)
    .then(response => {
      const payload = response.results || response.result

      dispatch({
        type: actionType,
        payload: payload,
        params: params
      })

      return response
    })
    .catch(err => {
      throw err
    })
}

export const receivedDraft = (draft) => ({
  type: constants.RECEIVED_DRAFT,
  draft
})

export const receivedDrafts = (drafts) => {
  return (dispatch) => {
    return dispatch(getRequest('/api/drafts', null, constants.RECEIVED_DRAFTS))
  }
}
