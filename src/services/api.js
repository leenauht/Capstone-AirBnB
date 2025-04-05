import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://airbnbnew.cybersoft.edu.vn/api",
});

api.interceptors.request.use((config) => {
  const tokenFromLocalStorage =
    localStorage.getItem("accessToken") || Cookies.get("token");
  config.headers = {
    ...config.headers,
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA3OCIsIkhldEhhblN0cmluZyI6IjI3LzA3LzIwMjUiLCJIZXRIYW5UaW1lIjoiMTc1MzU3NDQwMDAwMCIsIm5iZiI6MTcyNjA3NDAwMCwiZXhwIjoxNzUzNzIyMDAwfQ.BTmM2iB4rp2M5zBswdnAhImSAoSPeaxquN5mTgxFzaQ",

    token: tokenFromLocalStorage,
  };

  return config;
});

api.interceptors.response.use((response) => {
  const { data } = response;
  // if (response.status !== 200 || data.statusCode !== 200) {
  //   toast.error("Co loi xay ra!");
  // }
  return data;
});

export default api;
