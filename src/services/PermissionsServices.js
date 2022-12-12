import axios_core from "axios";
import { global } from "../global.js";

export function getPermissions() {
  const axios = axios_core.create({
    baseURL: global.SERVER_NAME,
    headers: global.HEADERS,
  });

  return axios
    .get(`${global.API_PERMISSIONS}`, global.HEADERS)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function createPermission(permission) {
  const axios = axios_core.create({
    baseURL: global.SERVER_NAME,
    headers: global.HEADERS,
  });

  return axios
    .post(`${global.API_PERMISSIONS}`, permission)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function updatePermission(permission, permissionID) {
  const axios = axios_core.create({
    baseURL: global.SERVER_NAME,
    headers: global.HEADERS,
  });

  return axios
    .put(`${global.API_PERMISSIONS}/${permissionID}`, permission)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
}
