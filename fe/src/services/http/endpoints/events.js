import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllEvents = () => {
  return toResponse(http.get("/events"));
};

export const joinToEvent = id => {
  return toResponse(http.post(`/events/join/${id}`));
};
