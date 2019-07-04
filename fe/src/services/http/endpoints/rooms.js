import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllRooms = () => {
  return toResponse(http.get("/rooms"));
};

// ROOM TYPES
export const createRoomType = credentials => {
  return toResponse(http.post(`/roomtypes`, credentials));
};
export const updateRoomType = (credentials, id) => {
  return toResponse(http.patch(`/roomtypes/${id}`, credentials));
};
export const getRoomTypes = roomTypePage => {
  return toResponse(http.get(`/roomtypes?page=${roomTypePage}`));
};
export const deleteRoomType = roomTypeId => {
  return toResponse(http.delete(`/roomtypes/${roomTypeId}`));
};
