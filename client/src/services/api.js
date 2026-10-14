import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("saas_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const unwrap = (response) => response.data.data;

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials).then(unwrap),
  register: (details) => api.post("/auth/register", details).then(unwrap),
};

export const templateApi = {
  list: (params) => api.get("/templates", { params }).then(unwrap),
  listFavorites: () => api.get("/favorites").then(unwrap),
  addFavorite: (templateId) =>
    api.post(`/favorites/${templateId}`).then(unwrap),
  removeFavorite: (templateId) =>
    api.delete(`/favorites/${templateId}`).then(unwrap),
};

export function getApiError(error) {
  return (
    error.response?.data?.message ||
    "We could not connect to the service. Please try again."
  );
}

export default api;
