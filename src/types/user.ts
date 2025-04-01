interface User {
  name: string;
  email: string;
}
export interface UserLoginRequest {
  email: string;
  password: string;
}
export interface UserRequest extends User {
  password: string;
}
export interface UserResponse extends User {
  id: number;
  createdAt: string;
}
export interface TokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  refreshToken: string;
}
