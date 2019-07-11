import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllRoles = () => {
  return toResponse(http.get("/roles"));
};

export const assignRoleToUser = ids => {
  return toResponse(http.post("/roles/assign", ids));
};
