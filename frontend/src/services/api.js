import axios from "axios";

const API = axios.create({
  baseURL:
    "https://fantagram-backend.onrender.com/api",
});

export default API;