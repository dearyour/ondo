import { AxiosError } from "axios";
import { CommentParams } from "./Comment.interface";

export interface FeedParams {
  feedId: number;
  challengeId: number;
  image: string;
  content: string;
  userId: number;
  createdDate: Date;
  modifiedDate: Date;
  feedlike: Array<number>;
  comments: CommentParams;
}

export interface Feed {
  items: any;
  isLoading: boolean;
  error: AxiosError | null;
}

export interface FeedParamType {
  feedId: number;
}
