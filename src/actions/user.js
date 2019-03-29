import { REQUEST_USERINFO, SET_USERINFO, GET_USERINFO } from "../constants";
import fetch from "../utils/fetch";
import API from "../utils/api";

export const requestUserInfo = (user) => {
    return {
        type: REQUEST_USERINFO,
        user
    }
}
export const setUserInfo = (user) => {
    return {
        type: SET_USERINFO,
        user
    }
}


export const getUserInfo = (user) => {
    return {
        type: GET_USERINFO,
        user
    }
}

export const fetchUserInfo = (user) => {
    return dispatch => {
        // start
        dispatch(requestUserInfo(user))
        return fetch.post(`/api/${API.userInfo}`, user).then(res => {
            const user = res.data.response_data;
            // localStorage.setItem('user', JSON.stringify(user));
            dispatch(setUserInfo(user))
        })
    }
}