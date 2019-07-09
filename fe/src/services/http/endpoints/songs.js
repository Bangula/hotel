import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllSongs = () => {
  return toResponse(http.get("/songs"));
};

export const createSong = song => {
  return toResponse(http.post("/songs", song));
};

export const deleteSong = id => {
  return toResponse(http.delete(`/songs${id}`));
};

export const updateSong = (song, id) => {
  return toResponse(http.patch(`/songs/${id}`, song));
};

export const getSongById = id => {
  return toResponse(http.get(`/songs/${id}`));
};
