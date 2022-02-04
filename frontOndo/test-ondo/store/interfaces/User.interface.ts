import { AxiosError } from "axios";

export interface UserParams { 
  nickname: string;
  email: string;
  data: string | null;
  error: AxiosError | null;
}

export interface User{
  isLoading: boolean;
  users: User[];
  error: AxiosError | null;
}
