//http://api.quantox-hotel.loc/v1/services

import http from "../index";
import toResponse from "@helpers/toResponse";

export const getServices = () => {
  return toResponse(http.get(`/services`));
};
