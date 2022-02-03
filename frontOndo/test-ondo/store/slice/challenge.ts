import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Challenge, ChallengeParams, ChallengeParamType } from "../interfaces/Challenge.interface";

// initialState
export const initialState: Challenge = {
  challenges: [],
  isLoading: false,
  error: null,
};

export const challengeSlice = createSlice({
  name: 'challenge',
  initialState,
  reducers: {
    getChallenge: (state, action: PayloadAction<ChallengeParamType>) => {
      state.isLoading = false;
    },
    getChallengeSuccess: (state, action: PayloadAction<ChallengeParams>) => {
      state.isLoading = true;
      state.challenges.length = 0;
      state.challenges = [...state.challenges, action.payload];
    },
    getChallengeFailure: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    }
  }
});

export const challenge = challengeSlice.name;
export const challengeReducer = challengeSlice.reducer;
export const challengeAction = challengeSlice.actions;