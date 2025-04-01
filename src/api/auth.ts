import { api } from "api";
import { UserLoginRequest, UserRequest } from "types/user";

export const signup = async (request: UserRequest) => {
  await api(`api/v1/auth/sign-up`, "POST", request);
  return "회원가입이 완료되었습니다.";
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
    throw new Error("다시 로그인 해주세요.");
  }
};
export async function tokenRefresh() {
  try {
    const response = await api(`api/v1/auth/refresh`, "POST");
    return response;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("다시 로그인 해주세요.");
  }
}
