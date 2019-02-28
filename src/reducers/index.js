import {
    combineReducers
} from 'redux';
import todo from './todo';

// 合并操作
const rootReducer = combineReducers({
    todo
})

export default rootReducer;