import { REQUEST_USERINFO, SET_USERINFO, GET_USERINFO } from "../constants";

const initUserInfo = {};

const UserInfoReducer = (state = initUserInfo, actions) => {
    switch (actions.type) {
        case REQUEST_USERINFO:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case SET_USERINFO:
            return { ...actions.user }
            break;
        case GET_USERINFO:
            return initUserInfo;
        default:
            return initUserInfo;
    }
}

export default UserInfoReducer;