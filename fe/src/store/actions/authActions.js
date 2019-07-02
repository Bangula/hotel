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
      let token = data.data.access_token;
      let jwtToken = `${data.data.token_type} ${data.data.access_token}`;
      await localStorage.setItem("jwtToken", jwtToken);
      history.push("/");
    } else if (error) {
      console.log(error);
    }
  };
};

export const register = user => {
  return async dispatch => {
    const { data, error } = await registerUser(user);
    if (data) {
      console.log(data);
    } else if (error) {
      console.log(error.response);
    }
  };
};

export const getProfile = () => {
  return async dispatch => {
    const { data, error } = await getLogedUser();
    if (data) {
      localStorage.setItem("user", JSON.stringify(data.data));
      dispatch({ type: SAVE_USER_INFO, payload: data.data });
    } else if (error) {
      console.log(error);
    }
  };
};
