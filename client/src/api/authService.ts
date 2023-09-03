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
  try {
    const response = await api.post("/accounts/login", { email, password });
    console.log(response);

    return response.data;
  } catch (error: any) {
    console.error("Error logging in:", error.response?.data);
    throw error;
  }
};

// Logout user
export const logoutUser = async (_id: string) => {
  try {
    const response = await api.post("/accounts/logout", { _id }); // Replace '/logout' with your endpoint path if different
    return response.data;
  } catch (error: any) {
    console.error("Error logging out:", error.response?.data);
    throw error;
  }
};

// Refresh access token
export const refreshToken = async (_id: string) => {
  try {
    const response = await api.post("/accounts/refresh-token", { _id }); // Replace '/refresh-token' with your endpoint path if different
    return response.data;
  } catch (error: any) {
    console.error("Error refreshing token:", error.response?.data);
    throw error;
  }
};
