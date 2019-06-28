import { loginUser } from "@endpoints/users";
import jwt_decode from "jwt-decode";
import { SET_USER, LOGOUT_USER } from "../../store/types";

export const loginUser = user => {
  return async dispatch => {
    const { data, error } = await loginUser(user);
    if (data) {
      // let token = data.data.token;
      // let decoded = jwt_decode(token);
      console.log(data);

      dispatch({
        type: SET_USER,
        payload: {
          name: decoded.name,
          id: decoded.id
        }
      });
      await localStorage.setItem("jwtToken", token);
    } else if (error) {
      console.log(error.response);
    }
  };
};
