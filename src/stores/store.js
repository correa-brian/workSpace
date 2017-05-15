import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import draftReducer from '../Draft/reducers/draftReducer'

var store

export default {
  initialize: () => {
    const reducers = combineReducers({
      draftReducer: draftReducer
    })
    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )
    return store
  },
  currentStore: () => {
    return store
  }
}
