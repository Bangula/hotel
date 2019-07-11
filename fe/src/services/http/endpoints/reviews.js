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

//Admin reviews
export const getReviewsOnHold = page => {
  return toResponse(http.get(`/reviews?search=status%3Ahold&page=${page}`));
};
//http://api.quantox-hotel.local/v1/reviews?search=status%3Aapprove&page=2
export const getReviewsApproved = page => {
  return toResponse(http.get(`/reviews?search=status%3Aapprove&page=${page}`));
};
export const approveReview = id => {
  return toResponse(http.get(`reviews/${id}/approve`));
};

//http://api.quantox-hotel.loc/v1/reviews/:id
export const deleteReview = id => {
  return toResponse(http.delete(`reviews/${id}`));
};

//http://api.quantox-hotel.loc/v1/reviews/:id/approve
//http://api.quantox-hotel.local/v1/reviews?search=status%3Ahold&page=2
