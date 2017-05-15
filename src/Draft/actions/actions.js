import constants from '../constants/constants'

export const receivedDraft = (draft) => ({
  type: constants.RECEIVED_DRAFT,
  draft
})
