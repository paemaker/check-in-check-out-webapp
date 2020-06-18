import {applyMiddleware, combineReducers, createStore} from 'redux'
import logger, {createLogger} from 'redux-logger';

import {drawerReducer} from './drawer/duck';

const reducer = combineReducers
({
    drawer: drawerReducer
})

const store = createStore(reducer, applyMiddleware(logger));

export default store;