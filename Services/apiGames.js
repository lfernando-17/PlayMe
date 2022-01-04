import axios from "axios";

const apiGames = axios.create({
  baseURL: "https://api.igdb.com/v4",
});

export default apiGames;