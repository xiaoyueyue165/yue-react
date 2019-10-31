import { REQUEST_USERINFO, SET_USERINFO, GET_USERINFO } from '../constants';

const initUserInfo = {};

const UserInfoReducer = (state = initUserInfo, actions) => {
  switch (actions.type) {
    case REQUEST_USERINFO:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case SET_USERINFO:
      return { ...actions.user };
    case GET_USERINFO:
      return initUserInfo;
    default:
      return initUserInfo;
  }
};

export default UserInfoReducer;
