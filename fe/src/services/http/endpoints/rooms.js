import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllRooms = () => {
  return toResponse(http.get("/rooms"));
};
