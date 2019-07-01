import http from "../index";
import toResponse from "@helpers/toResponse";

export const getPromotions = () => {
  return toResponse(http.get("http://api.quantox-hotel.local/v1/promotions"));
};
