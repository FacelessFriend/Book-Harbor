import axios from "axios";

const $api = axios.create({
  withCredentials: true,
  baseURL: "/api",
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const prevReq = error.config;
    if (error.response.status == 401) {
      try {
        const res = await $api.get("/refresh");
        localStorage.setItem("token", res.data.accessToken);
        return $api.request(prevReq);
      } catch (error) {
        console.log("Рефреш токен истек / не валиден!");
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
