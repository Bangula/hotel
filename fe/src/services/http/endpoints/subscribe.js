import http from "../index";
import toResponse from "@helpers/toResponse";

export const subscribeUser = email => {
  return toResponse(http.post("/subscribers", email));
};

export const getAllSubscribers = page => {
  return toResponse(http.get(`/subscribers?page=${page}`));
};

export const deleteSubscriber = email => {
  return toResponse(http.delete(`/subscribers/${email}`));
};

export const createNewCapmpaign = obj => {
  return toResponse(http.post("/campaigns", obj));
};
