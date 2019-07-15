import http from "../index";
import toResponse from "@helpers/toResponse";

export const getPromotions = () => {
  return toResponse(http.get("/promotions"));
};

//http://api.quantox-hotel.local/v1/promotions?page=2

export const getPromotionsPerPage = page => {
  return toResponse(http.get(`/promotions?page=${page}`));
};
export const getPromotionById = id => {
  return toResponse(
    http.get(`/promotions/${id}?include=roomTypes,file,services,facilities`)
  );
};

export const createPromotion = credentials => {
  return toResponse(http.post("/promotions", credentials));
};

export const deletePromotion = id => {
  return toResponse(http.delete(`/promotions/${id}`));
};

export const updatePromotion = (credentials, id) => {
  return toResponse(http.patch(`/promotions/${id}`, credentials));
};
