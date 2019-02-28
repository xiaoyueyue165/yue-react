import {
    combineReducers
} from 'redux';
import { routerReducer } from 'react-router-redux'
import todo from './todo';

// 合并操作
const rootReducer = combineReducers({
    todo,
    routing: routerReducer
})

export default rootReducer;