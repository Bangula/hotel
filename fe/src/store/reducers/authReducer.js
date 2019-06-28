import { SET_USER, LOGOUT_USER, SAVE_USER_INFO } from "../../store/types";
import { get } from "https";
export const getToken = () => localStorage["jwtToken"];
const initialState = {
  isAuthenticated: !!getToken(),
  info: JSON.parse(localStorage.getItem("user")) || {},
  serverErrors: {}
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: {}
      };
    case LOGOUT_USER:
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("user");
      return {
        ...state,
        isAuthenticated: false,
        info: {}
      };

    case SAVE_USER_INFO:
      return { ...state, info: action.payload };
    default:
      return state;
  }
};
