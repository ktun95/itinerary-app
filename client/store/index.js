import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import activityReducer from './activities'
import mapReducer from './map'

const store = createStore(
    combineReducers({
        activityReducer,
        mapReducer
    }),
    applyMiddleware(logger, thunkMiddleware)
)

export default store

export * from './activities'
export * from './map'