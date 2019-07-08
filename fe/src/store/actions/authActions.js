import {
  loginUser,
  registerUser,
  getLogedUser
} from "../../services/http/endpoints/users";
import jwt_decode from "jwt-decode";
import { SAVE_USER_INFO } from "@store/types";

export const login = (user, history) => {
  return async dispatch => {
    const { data, error } = await loginUser(user);
    if (data) {
      let jwtToken = `${data.data.token_type} ${data.data.access_token}`;
      localStorage.setItem("jwtToken", jwtToken);
      history.push("/");
    } else if (error) {
      dispatch({
        type: "LOGIN_ERROR"
      });
      console.log(error);
    }
  };
};

export const register = (user, history) => {
  return async dispatch => {
    const { data, error } = await registerUser(user);
    if (data) {
      console.log(data);
      history.push("/login");
    } else if (error) {
      dispatch({ type: "REGISTRATION_ERROR" });
      console.log(error.response);
    }
  };
};

export const getProfile = () => {
  return async dispatch => {
    const { data, error } = await getLogedUser();
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.data));
      console.log(data.data);
      dispatch({ type: SAVE_USER_INFO, payload: data.data });
    } else if (error) {
      console.log(error);
    }
  };
};
