import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feed, FeedParams, FeedParamType } from "../interfaces/Feed.interface";

//initialState
export const initialState: Feed = {
  feeds: [],
  isLoading: false,
  error: null,
}

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    getFeed: (state, action: PayloadAction<FeedParamType>) => {
      state.isLoading = false;
    },
    getFeedSuccess: (state, action: PayloadAction<FeedParams>) => {
      state.isLoading = true;
      state.feeds.length = 0;
      state.feeds = [...state.feeds, action.payload];
    },
    getFeedFailure: (state, { payload: error }) => {
      state.isLoading = false;
      state.error = error;
    },
  },
});

export const feed = feedSlice.name;
export const feedReducer = feedSlice.reducer;
export const feedAction = feedSlice.actions;
export default feedReducer;