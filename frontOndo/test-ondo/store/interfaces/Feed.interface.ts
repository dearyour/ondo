import { AxiosError } from "axios";

export interface FeedParams {
  feedId: number;
  challengeId: number;
  image: string;
  content: string;
  userId: number;
  date: Date;
}

export interface Feed {
  feeds: FeedParams[];
  isLoading: boolean;
  error: AxiosError | null;
}