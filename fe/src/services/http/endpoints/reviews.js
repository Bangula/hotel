import http from "../index";
import toResponse from "@helpers/toResponse";

export const getReviews = () => {
  return toResponse(http.get("/reviews"));
};
export const getPage = pageNum => {
  return toResponse(http.get(`/reviews?page=${pageNum}`));
};
