import http from "../index";
import toResponse from "@helpers/toResponse";

export const getAllSongs = page => {
  return toResponse(http.get(`/songs?page=${page}&include=genre`));
};

export const createSong = song => {
  return toResponse(http.post("/songs", song));
};

export const deleteSong = id => {
  return toResponse(http.delete(`/songs/${id}`));
};

export const updateSong = (song, id) => {
  return toResponse(http.patch(`/songs/${id}`, song));
};

export const getSongById = id => {
  return toResponse(http.get(`/songs/${id}?include=genre`));
};
