import {applyMiddleware, combineReducers, createStore} from 'redux'
import logger, {createLogger} from 'redux-logger';

import { DrawerReduce } from './Action';

const Reducer = combineReducers
({
    drawer: DrawerReduce
})

const Store = createStore(Reducer, applyMiddleware(logger));
export default Store;