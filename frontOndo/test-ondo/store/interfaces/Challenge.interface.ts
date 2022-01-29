import { AxiosError } from "axios";

export interface Challenge {
  title: String;
  content: String;
  s_date: Date;
  image: String;
  owner: String;
  category: String;
  error: AxiosError | null;
}