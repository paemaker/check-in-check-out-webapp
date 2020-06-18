import {applyMiddleware, combineReducers, createStore} from 'redux'
import logger, {createLogger} from 'redux-logger';

import { DrawReduce } from './Action';

const Reducer = combineReducers
({
    drawer: DrawReduce
})

const Store = createStore(Reducer, applyMiddleware(logger));
export default Store;