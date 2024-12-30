export interface User{
  id: string;
  username: string;
  email: string;

}
export interface LoginPayload{
  email: string;
  password: string;
}
export interface RegisterPayload{
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  cin: string;
  nationality: string;

}
export interface ApiResponse<T>{
  status?: boolean;
  message?: string;
  error?: string;
  token?: string;
  data?: T;
}
