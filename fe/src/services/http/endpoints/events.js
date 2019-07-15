import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllEvents = page => {
  return toResponse(
    http.get(`/events?page=${page}?include=songs,users,location`)
  );
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
  return toResponse(http.get(`/events/${id}?include=songs,users,location`));
};

export const updateEvent = (obj, id) => {
  return toResponse(http.patch(`/events/${id}`, obj));
};

// Event types
export const getAllEventTypes = page => {
  return toResponse(http.get(`/event-types?page=${page}`));
};

export const createEventType = name => {
  return toResponse(http.post("/event-types", name));
};

export const deleteEventType = id => {
  return toResponse(http.delete(`/event-types/${id}`));
};

export const getEventTypeById = id => {
  return toResponse(http.get(`/event-types/${id}`));
};

export const updateEventType = (id, name) => {
  return toResponse(http.patch(`/event-types/${id}`, name));
};
