import { AxiosError } from "axios";

export interface User { 
  nickname: string;
  email: string;
  count: number;
  data: string | null;
  error: AxiosError | null;
}
