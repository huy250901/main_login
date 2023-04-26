import axios from "axios";

const API_URL = "api.training.div3.pgtest.co/api/v1";

// Set default base URL for axios
axios.defaults.baseURL = `https://${API_URL}`;

// Add authorization header to all requests
axios.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY4MjE2MzAxOH0.1OHw4SAkI8-9f6QZWHFG7kWxKAkjz90TiHo960AfoNQ";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
