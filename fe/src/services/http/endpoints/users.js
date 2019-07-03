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

export const getUsers = () => {
  return toResponse(http.get("/users"));
};
export const getUsersPerPage = page => {
  return toResponse(http.get(`/users?page=${page}`));
};

export const deleteUser = userId => {
  return toResponse(http.delete(`/users/${userId}`));
};
