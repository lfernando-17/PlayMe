import axios from "axios";

const apiGames = axios.create({
  baseURL: "https://api.rawg.io/api/",
});

export default apiGames;