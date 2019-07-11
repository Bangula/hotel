import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllEvents = page => {
  return toResponse(http.get(`/events?page=${page}`));
};

export const joinToEvent = id => {
  return toResponse(http.post(`/events/join/${id}`));
};

export const deleteEvent = id => {
  return toResponse(http.delete(`/events/${id}`));
};

export const createEvent = obj => {
  return toResponse(http.post("/events", obj));
};

export const getEventById = id => {
  return toResponse(http.get(`/events/${id}`));
};

export const updateEvent = (obj, id) => {
  return toResponse(http.patch(`/events/${id}`, obj));
};

export const getAllEventTypes = page => {
  return toResponse(http.get(`/event-types?page=${page}`));
};
