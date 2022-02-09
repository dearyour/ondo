import { AxiosError } from "axios";

export interface UserParams {
  nickname: string;
  email: string;
  session: string | null;
  error: AxiosError | null;
  ondo: number;
  image: string;
  isLoading: boolean;
}

export interface User {
  isLoading: boolean;
  users: User[];
  error: AxiosError | null;
}
