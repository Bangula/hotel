import {
  SET_USER,
  LOGOUT_USER,
  SAVE_USER_INFO,
  HIDE_LAYOUT,
  SHOW_LAYOUT
} from "../../store/types";
export const getToken = () => localStorage["jwtToken"];

const initialState = {
  isAuthenticated: !!getToken(),
  isAdmin: true,
  info: JSON.parse(localStorage.getItem("user")) || {},
  serverErrors: {
    login: "",
    register: ""
  },
  hideLayout: false
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
    case "LOGIN_ERROR":
      return {
        ...state,
        serverErrors: {
          login: "User name or password are incorrect."
        }
      };
    case "REGISTRATION_ERROR":
      return {
        ...state,
        serverErrors: {
          register: "Registration failed. Email already exist."
        }
      };

    case SAVE_USER_INFO:
      return { ...state, info: action.payload, isAuthenticated: true };
    case HIDE_LAYOUT:
      return {
        ...state,
        hideLayout: true
      };
    case SHOW_LAYOUT:
      return {
        ...state,
        hideLayout: false
      };
    default:
      return state;
  }
};
