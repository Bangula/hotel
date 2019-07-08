import http from "../index";
import toResponse from "@helpers/toResponse";

export const createGallery = credentials => {
  return toResponse(http.post("/galleries", credentials));
};
export const getGalleries = () => {
  return toResponse(http.get("/galleries"));
};
