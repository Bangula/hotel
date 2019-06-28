import {
  loginUser,
  registerUser,
  getLogedUser
} from "../../services/http/endpoints/users";
import jwt_decode from "jwt-decode";

export const login = user => {
  return async dispatch => {
    const { data, error } = await loginUser(user);
    if (data) {
      let token = data.data.access_token;
      let decoded = jwt_decode(token);
      let jwtToken = `${data.data.token_type} ${data.data.access_token}`;
      console.log(decoded);

      await localStorage.setItem("jwtToken", jwtToken);
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
      console.lof(error);
    }
  };
};

export const getProfile = () => {
  return async dispatch => {
    const { data, error } = await getLogedUser();
    if (data) {
      localStorage.setItem("user", JSON.stingify(data.data));
      dispatch({ type: SAVE_USER_INFO, payload: data.data });
    } else if (error) {
      console.log(error);
    }
  };
};
