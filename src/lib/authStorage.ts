import { TokenResponse } from "types/user";

export const logoutUtility = () => {
  window.localStorage.removeItem("accessToken");
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("expiresIn");
};

export const loginUtility = (response: TokenResponse) => {
  window.localStorage.setItem("accessToken", response.accessToken);
  window.localStorage.setItem("refreshToken", response.refreshToken);
  window.localStorage.setItem("expiresIn", response.expiresIn);
};
