import http from "../index";
import toResponse from "@helpers/toResponse";

export const getReviews = () => {
  return toResponse(http.get("/reviews"));
};
