import { AxiosError } from "axios";

export interface User { 
  nickname: string;
  email: string;
  count: number;
  data: string;
  error: AxiosError | null;
}
