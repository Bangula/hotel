import http from "../index";
import toResponse from "@helpers/toResponse";

export const createReservation = reservation => {
  return toResponse(http.post("/reservations", reservation));
};

export const getAllReservations = page => {
  return toResponse(http.get(`/reservations?page=${page}`));
};

export const deleteReservation = id => {
  return toResponse(http.delete(`/reservations/${id}`));
};
