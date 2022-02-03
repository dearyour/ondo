import { AxiosError } from "axios";

export interface CommentParams {
  commentId: number;
  userId: number;
  feedId: number;
  content: string;
}

export interface Comment {
  comments: CommentParams[];
  isLoading: boolean;
  error: AxiosError | null;
}