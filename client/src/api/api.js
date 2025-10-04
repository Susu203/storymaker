import axios from "axios";

// Instancia de Axios con configuración base
const api = axios.create({
  baseURL: "http://localhost:5000/api/ai",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
