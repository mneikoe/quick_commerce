import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:8181/api/v1",
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`; // <- "Bearer " add karo
  }

  // if (token) {
  //   config.headers["Authorization"] = `${token}`;
  // }

  // If `config.isMultipart` is true, use multipart/form-data
  if (config.isMultipart) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default axiosInstance;
