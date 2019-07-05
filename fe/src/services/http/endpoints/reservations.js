import http from "../index";
import toResponse from "@helpers/toResponse";

export const createReservation = reservation => {
  return toResponse(http.post("/reservations", reservation));
};
