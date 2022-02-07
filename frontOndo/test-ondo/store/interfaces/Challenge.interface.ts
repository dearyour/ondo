import { AxiosError } from "axios";

export interface ChallengeParams {
  challengeId: number;
  title: string;
  content: string;
  sDate: Date;
  image: string;
  owner: number;
  category: string;
  error: AxiosError | null;
}

export interface Challenge {
  challenges: ChallengeParams[];
  isLoading: boolean;
  error: AxiosError | null;
}

export interface ChallengeParamType {
  challengeId: number;
  category: string;
}