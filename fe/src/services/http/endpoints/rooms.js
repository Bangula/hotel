import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllRooms = pageNum => {
  return toResponse(
    http.get(`/rooms?page=${pageNum}?include=roomType,facilities,gallery`)
  );
};

export const getRoomById = id => {
  return toResponse(
    http.get(`/rooms/${id}?include=roomType,facilities,gallery`)
  );
};
export const createRoom = credentials => {
  return toResponse(http.post("/rooms", credentials));
};

export const deleteRoom = roomId => {
  return toResponse(http.delete(`/rooms/${roomId}`));
};

export const getRoom = roomId => {
  return toResponse(http.get(`/rooms/${roomId}`));
};
export const updateRoom = (credentials, roomId) => {
  return toResponse(http.patch(`/rooms/${roomId}`, credentials));
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

//ROOM FACILITIES
//facilities?page=2"
export const getFacilities = page => {
  return toResponse(http.get(`/facilities?page=${page}`));
};
//single
export const getFacilitiy = facilityId => {
  return toResponse(http.get(`/facilities/${facilityId}`));
};
export const createFacility = credentials => {
  return toResponse(http.post(`/facilities`, credentials));
};
export const deleteFacilitiy = facilityId => {
  return toResponse(http.delete(`/facilities/${facilityId}`));
};

export const updateFacility = (credentials, facilityId) => {
  return toResponse(http.patch(`/facilities/${facilityId}`, credentials));
};
