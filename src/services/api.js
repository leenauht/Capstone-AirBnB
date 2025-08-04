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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOT0RFSlMgNTAiLCJIZXRIYW5TdHJpbmciOiIxMC8xMC8yMDI1IiwiSGV0SGFuVGltZSI6IjE3NjAwNTQ0MDAwMDAiLCJuYmYiOjE3NDA4NzM2MDAsImV4cCI6MTc2MDIyNzIwMH0.mMbbQrfpocDbm-PEesfDTdZug1iAejOCCrKEFpq4pr8",

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
