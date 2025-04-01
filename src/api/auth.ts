import { api } from "api";
import { UserLoginRequest, UserRequest, UserResponse } from "types/user";

export const signup = async (request: UserRequest) => {
  const response = await api(`api/v1/auth/sign-up`, "POST", request);
  return response;
};
export const login = async (request: UserLoginRequest) => {
  const response = await api(`api/v1/auth/sign-in`, "POST", request);
  return response;
};

export const getMe = async () => {
  try {
    const response = await api(`api/v1/auth/me`, "GET");
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
export const refreshToken = async () => {
  try {
    const response = await api(`api/v1/auth/refresh`, "POST");
    return response;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
