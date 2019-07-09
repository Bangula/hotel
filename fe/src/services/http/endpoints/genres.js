import http from "../index";
import toResponse from "@helpers/toResponse";

export const createGenre = name => {
  return toResponse(http.post("/genres", name));
};

export const getAllGenres = () => {
  return toResponse(http.get("/genres"));
};

export const getGenreById = id => {
  return toResponse(http.get(`/genres/${id}`));
};

export const deleteGenre = id => {
  return toResponse(http.delete(`/genres/${id}`));
};

export const updateGenre = (obj, id) => {
  return toResponse(http.patch(`/genres/${id}`, obj));
};
