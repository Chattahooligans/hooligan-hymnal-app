import API from "./baseService";
import { Settings } from "../../config";

export const login = async (credentials) => {
  const response = await API.post("/api/users/login", credentials);
  return response.data;
};

export const checkToken = async (token) => {
  await API.get("/api/users/me", null, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((response) => {
    return response.data;
  });
};
