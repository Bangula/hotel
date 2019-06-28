import axios from "axios";
import { authRequest, authResponse } from "./interceptors/authentication";

const url = "http://api.quantox-hotel.local/v1";

const http = axios.create({
  baseURL: url
});

http.interceptors.request.use(authRequest);
http.interceptors.response.use(...authResponse);

export default http;
