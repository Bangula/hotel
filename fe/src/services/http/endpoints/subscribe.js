import http from "../index";
import toResponse from "@helpers/toResponse";

export const subscribeUser = email => {
  return toResponse(http.post("/subscribers", email));
};
