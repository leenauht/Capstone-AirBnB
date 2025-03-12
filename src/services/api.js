import axios from "axios";

const api = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ",
  };

  //   const accessToken = JSON.parse();

  return config;
});

export default api;
