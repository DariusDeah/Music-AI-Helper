export interface UserApiResponse {
  id: string;
  email: string;
  username: string;
}

export interface UserQueryFields {
  email: string;
  username: string;
  id: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
