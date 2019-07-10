import http from "../index";
import toResponse from "@helpers/toResponse";

export const getReviews = () => {
  return toResponse(http.get("/reviews"));
};
export const getPage = pageNum => {
  return toResponse(http.get(`/reviews?page=${pageNum}`));
};
export const createReview = credentials => {
  return toResponse(http.post(`/reviews`, credentials));
};
export const getReviewsOnHold = () => {
  return toResponse(http.get("/reviews?search=status:hold"));
};
export const getReviewsApproved = () => {
  return toResponse(http.get("/reviews?search=status:approve"));
};
