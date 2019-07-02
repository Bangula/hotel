import http from "../index";
import toResponse from "@helpers/toResponse";

export const getPromotions = () => {
  return toResponse(http.get("/promotions"));
};

export const getPromotionById = id => {
  return toResponse(http.get(`/promotions/${id}`));
};
