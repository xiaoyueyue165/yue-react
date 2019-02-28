import {
    ADD_TODO
} from "../constants";
const defaultState = [{
    id: 0,
    text: 'Use Redux',
    completed: false,
}];

const reducer = (state = defaultState, action) => {
    const {
        type,
        todo
    } = action;
    switch (type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                    completed: false,
                    text: action.text
                }
            ]
        default:
            return state;
    }
}

export default reducer;