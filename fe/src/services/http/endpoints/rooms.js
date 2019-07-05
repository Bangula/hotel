import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllRooms = pageNum => {
  return toResponse(http.get(`/rooms?page=${pageNum}`));
};

export const getRoomById = id => {
  return toResponse(http.get(`/rooms/${id}`));
};

// ROOM TYPES
export const createRoomType = credentials => {
  return toResponse(http.get(`/roomtypes/${credentials}`));
};
export const getRoomTypes = roomTypePage => {
  return toResponse(http.get(`/roomtypes?page=${roomTypePage}`));
};
export const deleteRoomType = roomTypeId => {
  return toResponse(http.delete(`/roomtypes/${roomTypeId}`));
};
