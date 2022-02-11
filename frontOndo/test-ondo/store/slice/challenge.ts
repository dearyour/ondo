import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Challenge,
  ChallengeParams,
  ChallengeParamType,
} from "../interfaces/Challenge.interface";

// initialState
export const initialState: Challenge | any = {
  challenges: [
    // {
    //   challengeId: 1,
    //   title: "물구나무 오래서기",
    //   content: "세상 들어올리기",
    //   sDate: new Date(),
    //   image: "",
    //   owner: 1,
    //   category: "운동",
    // },
    // {
    //   challengeId: 2,
    //   title: "춤 오래 추기",
    //   content: "댄서의 꿈을 위해",
    //   sDate: new Date(),
    //   image: "",
    //   owner: 2,
    //   category: "댄스",
    // },
  ],
  hotChallenges: [

  ],
  isLoading: false,
  error: null,
};

export const challengeSlice = createSlice({
  name: "challenge",
  initialState,
  reducers: {
    getChallenge: (state, action: PayloadAction<ChallengeParamType>) => {
    // getChallenge: (state) => {
      state.isLoading = true;
    },
    getChallengeSuccess: (state, action: PayloadAction<ChallengeParams>) => {
      state.isLoading = false;
      state.challenges.length = 0;
      state.challenges = [...state.challenges, action.payload];
    },
    getChallengeFailure: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const challenge = challengeSlice.name;
export const challengeReducer = challengeSlice.reducer;
export const challengeAction = challengeSlice.actions;
export default challengeReducer;
