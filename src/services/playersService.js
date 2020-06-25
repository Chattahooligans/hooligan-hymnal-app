import API from "./baseService";

export const getPlayers = () =>
  API.get("/api/players").then((response) => response.data);
