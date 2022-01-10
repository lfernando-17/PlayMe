import axios from "axios";

const apiGiveaway = axios.create({
  baseURL: "https://www.gamerpower.com/api",
});

export default apiGiveaway;