import { AxiosError } from "axios";

export interface CommentParams {
  commentId: number;
  // userId: number;
  // feedId: number;
  content: string;
  createdDate: Date;
  modifiedDate: Date;
}

export interface Comment {
  // comments: CommentParams[] | any;
  comments: any;
  isLoading: boolean;
  error: AxiosError | null;
}

export interface CommentParamType {
  commentId: number;
  feedId: number;
}
