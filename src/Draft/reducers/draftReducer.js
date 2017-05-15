import constants from '../constants/constants'

var initialState = {
  draft: {}
}

export default (state = initialState, action) => {
  let newState = Object.assign({}, state)

  switch(action.type){
    case constants.RECEIVED_DRAFT:
      console.log('REDUCER: '+JSON.stringify(action.draft))
      newState['draft'] = action.draft
      return newState

    default:
      return state
  }
}
