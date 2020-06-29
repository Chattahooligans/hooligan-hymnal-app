import API from "./baseService";

export const getSongs = () =>
  API.get("/api/songs").then((response) => response.data);
