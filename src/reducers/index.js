import {
    combineReducers
} from 'redux';
import { routerReducer } from 'react-router-redux'
import User from "./user";

// 合并操作
const rootReducer = combineReducers({
    User,
    routing: routerReducer
})

export default rootReducer;