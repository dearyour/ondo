import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "store/interfaces/Comment.interface";
import { Feed, FeedParams, FeedParamType } from "../interfaces/Feed.interface";

//initialState
export const initialState: Feed | any = {
  items: [],
  isLoading: false,
  error: null,
};

export const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    getFeed: (state) => {
      state.isLoading = true;
    },
    getFeedSuccess: (state, action) => {
      //payload는 api 요청 성공값 comments이다
      state.isLoading = false;
      state.items = action.payload;
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
