import http from "../index";
import toResponse from "@helpers/toResponse";

export const registerUser = credentials => {
  return toResponse(http.post("/register", credentials));
};

export const loginUser = credentials => {
  return toResponse(http.post("/clients/web/admin/login", credentials));
};

export const getLogedUser = () => {
  return toResponse(http.get("/user/profile"));
};

//"http://api.quantox-hotel.local/v1/users?page=2"
//"http://api.quantox-hotel.loc/v1/users/:id"

export const getUser = userId => {
  return toResponse(http.get(`/users/${userId}`));
};

export const getUsers = () => {
  return toResponse(http.get("/users"));
};

export const getUsersPerPage = page => {
  return toResponse(http.get(`/users?page=${page}`));
};

export const updateUserInfo = (credentials, id) => {
  console.log("from http", credentials, id);
  return toResponse(http.put(`/users/${id}`, credentials));
};
export const deleteUser = userId => {
  return toResponse(http.delete(`/users/${userId}`));
};
