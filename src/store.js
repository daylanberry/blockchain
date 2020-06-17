import { createStore, applyMiddleware, combineReducers } from 'redux'
import { accountReducer } from './reducers'
import {logger} from 'redux-logger'


const rootReducer = combineReducers({
  acct: accountReducer
})

export const store = createStore(rootReducer, applyMiddleware(logger))
