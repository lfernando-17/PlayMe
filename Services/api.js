import axios from "axios";

const api = axios.create({
  baseURL: "https://www.cheapshark.com/api/1.0",
});

export default api;