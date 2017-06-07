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

const postRequest = (endpoint, params, actionType) => {
  return (dispatch) =>
    APIManager.post(endpoint, params)
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

export const createdDraft = (draft) => {
  return (dispatch) => {
    return dispatch(postRequest('/api/drafts', draft, constants.CREATED_DRAFT))
  }
}

export const filterDrafts = (drafts, params) => {
  return (dispatch) => {
    return dispatch(getRequest('/api/getFilteredDrafts', params, constants.FILTER_DRAFTS))
  }
}

export const receivedDraft = (draft) => ({
  type: constants.RECEIVED_DRAFT,
  draft
})

export const receivedFeaturedDrafts = (drafts) => {
  return (dispatch) => {
    return dispatch(getRequest('/api/getFeaturedDrafts', null, constants.RECEIVED_FEATURED_DRAFTS))
  }
}
