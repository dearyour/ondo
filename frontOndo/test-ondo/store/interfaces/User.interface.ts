import { AxiosError } from "axios";

export interface User {
  username: string;
  email: string;
  count: number;
  data: string | null;
  error: AxiosError | null;
  ondo: number;
  image: string;
}

export interface UserParams {
  isLoading: boolean;
  users: User[];
  error: AxiosError | null;
}
