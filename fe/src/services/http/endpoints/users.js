import http from "../index";
import toResponse from "@helpers/toResponse";

export const registerUser = credentials => {
  return toResponse(http.post("/register", credentials));
};

export const loginUser = credentials => {
  return toResponse(http.post("/clients/web/admin/login", credentials));
};
