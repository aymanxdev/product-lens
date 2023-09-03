import axios from "axios";

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login user
export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/accounts/login", { email, password });
  return response.data;
};

// Logout user
export const logoutUser = async (_id: string) => {
  const response = await api.post("/accounts/logout", { _id });
  return response.data;
};

// Refresh access token
export const refreshToken = async (_id: string) => {
  const response = await api.post("/accounts/refresh-token", { _id });
  return response.data;
};

export const interceptorBeforeTokenExpiration = (
  tokenExpiryTime: number,
  _id: string,
) => {
  api.interceptors.request.use(
    async (config) => {
      const currentTime = Date.now();
      if (tokenExpiryTime - currentTime < 30000) {
        await refreshToken(_id);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};
