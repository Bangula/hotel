import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllLocations = page => {
  return toResponse(http.get(`/locations?page=${page}`));
};
