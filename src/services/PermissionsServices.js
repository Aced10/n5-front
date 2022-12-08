import axios_core from "axios";
import { global } from "../global.js";

export function getPermissions() {
  const axios = axios_core.create({
    baseURL: global.SERVER_NAME,
    headers: global.HEADERS,
  });

  return axios
    .get(`${global.API_GET_PERMISSIONS}`, global.HEADERS)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}
